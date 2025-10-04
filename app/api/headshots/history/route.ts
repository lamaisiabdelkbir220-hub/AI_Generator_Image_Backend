import db from "@/db";
import * as schema from '@/db/schema';
import { auth } from "@/lib/auth";
import { eq, and, desc, isNull, sql, or, like, gte, lte } from "drizzle-orm";

export async function GET(req: Request) {
  const authUser = await auth(req);

  if (!authUser)
    return Response.json({ 
      message: 'Authentication required', 
      data: null, 
      statusCode: 401 
    }, { status: 401 });

  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Pagination parameters
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const offset = (page - 1) * limit;

    // Filter parameters
    const styleFilter = searchParams.get('style');
    const statusFilter = searchParams.get('status');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');
    const favoritesOnly = searchParams.get('favorites_only') === 'true';

    // Build where conditions
    const whereConditions = [
      eq(schema.headshotGenerations.userId, authUser.id),
      isNull(schema.headshotGenerations.deletedAt) // Only non-deleted records
    ];

    if (styleFilter) {
      whereConditions.push(eq(schema.headshotGenerations.style, styleFilter));
    }

    if (statusFilter) {
      whereConditions.push(eq(schema.headshotGenerations.status, statusFilter as any));
    }

    if (dateFrom) {
      whereConditions.push(gte(schema.headshotGenerations.createdAt, new Date(dateFrom)));
    }

    if (dateTo) {
      whereConditions.push(lte(schema.headshotGenerations.createdAt, new Date(dateTo)));
    }

    if (favoritesOnly) {
      whereConditions.push(eq(schema.headshotGenerations.isFavorite, true));
    }

    // Get total count for pagination
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.headshotGenerations)
      .where(and(...whereConditions));

    const totalItems = countResult.count;
    const totalPages = Math.ceil(totalItems / limit);

    // Get generations with pagination
    const generations = await db
      .select({
        id: schema.headshotGenerations.id,
        status: schema.headshotGenerations.status,
        style: schema.headshotGenerations.style,
        aspectRatio: schema.headshotGenerations.aspectRatio,
        quality: schema.headshotGenerations.quality,
        batchSize: schema.headshotGenerations.batchSize,
        creditsUsed: schema.headshotGenerations.creditsUsed,
        progress: schema.headshotGenerations.progress,
        resultUrls: schema.headshotGenerations.resultUrls,
        processingTime: schema.headshotGenerations.processingTime,
        isFavorite: schema.headshotGenerations.isFavorite,
        createdAt: schema.headshotGenerations.createdAt,
        updatedAt: schema.headshotGenerations.updatedAt,
        errorMessage: schema.headshotGenerations.errorMessage
      })
      .from(schema.headshotGenerations)
      .where(and(...whereConditions))
      .orderBy(desc(schema.headshotGenerations.createdAt))
      .limit(limit)
      .offset(offset);

    // Transform data for response
    const transformedGenerations = generations.map(gen => ({
      id: gen.id,
      status: gen.status,
      style: gen.style,
      aspectRatio: gen.aspectRatio,
      quality: gen.quality,
      batchSize: gen.batchSize,
      creditsUsed: gen.creditsUsed,
      progress: gen.progress,
      createdAt: gen.createdAt,
      updatedAt: gen.updatedAt,
      processingTime: gen.processingTime,
      isFavorite: gen.isFavorite,
      resultsCount: Array.isArray(gen.resultUrls) ? gen.resultUrls.length : 0,
      thumbnailUrl: Array.isArray(gen.resultUrls) && gen.resultUrls.length > 0 ? gen.resultUrls[0] : null,
      hasError: gen.status === 'failed',
      errorMessage: gen.status === 'failed' ? gen.errorMessage : null
    }));

    const responseData = {
      generations: transformedGenerations,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        perPage: limit,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      },
      filters: {
        style: styleFilter,
        status: statusFilter,
        dateFrom,
        dateTo,
        favoritesOnly
      }
    };

    return Response.json({ 
      message: 'Generation history retrieved', 
      data: responseData, 
      statusCode: 200 
    }, { status: 200 });

  } catch (error) {
    console.error("Error retrieving generation history:", error);
    return Response.json({ 
      message: "Unable to retrieve generation history", 
      data: null, 
      statusCode: 500 
    }, { status: 500 });
  }
}

// POST endpoint for batch operations
export async function POST(req: Request) {
  const authUser = await auth(req);

  if (!authUser)
    return Response.json({ 
      message: 'Authentication required', 
      data: null, 
      statusCode: 401 
    }, { status: 401 });

  try {
    const rawData = await req.json();
    const { action, generationIds } = rawData;

    if (!action || !Array.isArray(generationIds) || generationIds.length === 0)
      return Response.json({ 
        message: 'Invalid batch operation request', 
        data: null, 
        statusCode: 400 
      }, { status: 400 });

    // Verify all generations belong to the user
    const userGenerations = await db
      .select({ id: schema.headshotGenerations.id })
      .from(schema.headshotGenerations)
      .where(
        and(
          eq(schema.headshotGenerations.userId, authUser.id),
          sql`${schema.headshotGenerations.id} = ANY(${generationIds})`,
          isNull(schema.headshotGenerations.deletedAt)
        )
      );

    const validIds = userGenerations.map(g => g.id);
    const invalidIds = generationIds.filter(id => !validIds.includes(id));

    if (invalidIds.length > 0)
      return Response.json({ 
        message: 'Some generations not found or not owned by user', 
        data: { invalidIds }, 
        statusCode: 400 
      }, { status: 400 });

    let updateData: any = { updatedAt: new Date() };
    let successMessage = '';

    switch (action) {
      case 'favorite':
        updateData.isFavorite = true;
        successMessage = 'Generations marked as favorite';
        break;
      case 'unfavorite':
        updateData.isFavorite = false;
        successMessage = 'Generations removed from favorites';
        break;
      case 'delete':
        updateData.deletedAt = new Date();
        successMessage = 'Generations deleted';
        break;
      default:
        return Response.json({ 
          message: 'Invalid batch action', 
          data: null, 
          statusCode: 400 
        }, { status: 400 });
    }

    // Perform batch update
    const result = await db
      .update(schema.headshotGenerations)
      .set(updateData)
      .where(sql`${schema.headshotGenerations.id} = ANY(${validIds})`)
      .returning({ id: schema.headshotGenerations.id });

    console.log(`Batch ${action} operation performed by user ${authUser.id} on ${result.length} generations`);

    return Response.json({ 
      message: successMessage, 
      data: { 
        action,
        affectedCount: result.length,
        affectedIds: result.map(r => r.id)
      }, 
      statusCode: 200 
    }, { status: 200 });

  } catch (error) {
    console.error("Error in batch operation:", error);
    return Response.json({ 
      message: "Unable to perform batch operation", 
      data: null, 
      statusCode: 500 
    }, { status: 500 });
  }
}