import db from "@/db";
import * as schema from '@/db/schema';
import { auth } from "@/lib/auth";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const authUser = await auth(req);

  if (!authUser)
    return Response.json({ 
      message: 'Authentication required', 
      data: null, 
      statusCode: 401 
    }, { status: 401 });

  try {
    const generationId = parseInt(params.id);
    
    if (isNaN(generationId))
      return Response.json({ 
        message: 'Invalid generation ID', 
        data: null, 
        statusCode: 400 
      }, { status: 400 });

    // Get generation details for the authenticated user
    const [generation] = await db
      .select()
      .from(schema.headshotGenerations)
      .where(
        and(
          eq(schema.headshotGenerations.id, generationId),
          eq(schema.headshotGenerations.userId, authUser.id)
        )
      );

    if (!generation)
      return Response.json({ 
        message: 'Headshot generation not found', 
        data: null, 
        statusCode: 404 
      }, { status: 404 });

    // Calculate estimated time remaining for processing generations
    let estimatedTimeRemaining = 0;
    if (generation.status === 'processing' || generation.status === 'queued') {
      // Simple estimation based on quality and batch size
      const baseTime = generation.quality === 'ultra' ? 60 : generation.quality === 'high' ? 45 : 30;
      const batchTime = ((generation.batchSize || 1) - 1) * 15;
      estimatedTimeRemaining = Math.max(0, (baseTime + batchTime) - (generation.processingTime || 0));
    }

    const responseData = {
      generationId: generation.id,
      status: generation.status,
      progress: generation.progress,
      estimatedTimeRemaining,
      createdAt: generation.createdAt,
      updatedAt: generation.updatedAt,
      style: generation.style,
      aspectRatio: generation.aspectRatio,
      quality: generation.quality,
      batchSize: generation.batchSize,
      creditsUsed: generation.creditsUsed,
      isFavorite: generation.isFavorite,
      results: generation.status === 'completed' ? generation.resultUrls : [],
      error: generation.status === 'failed' ? generation.errorMessage : null,
      metadata: generation.metadata,
      processingTime: generation.processingTime
    };

    return Response.json({ 
      message: 'Generation status retrieved', 
      data: responseData, 
      statusCode: 200 
    }, { status: 200 });

  } catch (error) {
    console.error("Error retrieving generation status:", error);
    return Response.json({ 
      message: "Unable to retrieve generation status", 
      data: null, 
      statusCode: 500 
    }, { status: 500 });
  }
}

// PUT endpoint to update generation metadata (like favorite status)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const authUser = await auth(req);

  if (!authUser)
    return Response.json({ 
      message: 'Authentication required', 
      data: null, 
      statusCode: 401 
    }, { status: 401 });

  try {
    const generationId = parseInt(params.id);
    const rawData = await req.json();
    
    if (isNaN(generationId))
      return Response.json({ 
        message: 'Invalid generation ID', 
        data: null, 
        statusCode: 400 
      }, { status: 400 });

    // Verify ownership
    const [generation] = await db
      .select()
      .from(schema.headshotGenerations)
      .where(
        and(
          eq(schema.headshotGenerations.id, generationId),
          eq(schema.headshotGenerations.userId, authUser.id)
        )
      );

    if (!generation)
      return Response.json({ 
        message: 'Headshot generation not found', 
        data: null, 
        statusCode: 404 
      }, { status: 404 });

    // Update allowed fields
    const updateData: any = {};
    
    if (typeof rawData.isFavorite === 'boolean') {
      updateData.isFavorite = rawData.isFavorite;
    }

    if (Object.keys(updateData).length === 0)
      return Response.json({ 
        message: 'No valid fields to update', 
        data: null, 
        statusCode: 400 
      }, { status: 400 });

    updateData.updatedAt = new Date();

    await db
      .update(schema.headshotGenerations)
      .set(updateData)
      .where(eq(schema.headshotGenerations.id, generationId));

    return Response.json({ 
      message: 'Generation updated successfully', 
      data: { updated: Object.keys(updateData) }, 
      statusCode: 200 
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating generation:", error);
    return Response.json({ 
      message: "Unable to update generation", 
      data: null, 
      statusCode: 500 
    }, { status: 500 });
  }
}

// DELETE endpoint to delete a generation
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const authUser = await auth(req);

  if (!authUser)
    return Response.json({ 
      message: 'Authentication required', 
      data: null, 
      statusCode: 401 
    }, { status: 401 });

  try {
    const generationId = parseInt(params.id);
    
    if (isNaN(generationId))
      return Response.json({ 
        message: 'Invalid generation ID', 
        data: null, 
        statusCode: 400 
      }, { status: 400 });

    // Verify ownership before deletion
    const [generation] = await db
      .select()
      .from(schema.headshotGenerations)
      .where(
        and(
          eq(schema.headshotGenerations.id, generationId),
          eq(schema.headshotGenerations.userId, authUser.id)
        )
      );

    if (!generation)
      return Response.json({ 
        message: 'Headshot generation not found', 
        data: null, 
        statusCode: 404 
      }, { status: 404 });

    // Soft delete by setting deletedAt timestamp
    await db
      .update(schema.headshotGenerations)
      .set({ 
        deletedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(schema.headshotGenerations.id, generationId));

    console.log(`Headshot generation ${generationId} deleted by user ${authUser.id}`);

    return Response.json({ 
      message: 'Generation deleted successfully', 
      data: { deletedId: generationId }, 
      statusCode: 200 
    }, { status: 200 });

  } catch (error) {
    console.error("Error deleting generation:", error);
    return Response.json({ 
      message: "Unable to delete generation", 
      data: null, 
      statusCode: 500 
    }, { status: 500 });
  }
}