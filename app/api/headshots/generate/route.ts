import db from "@/db";
import * as schema from '@/db/schema';
import { auth } from "@/lib/auth";
import { HEADSHOT_STYLES, HEADSHOT_COSTS, HEADSHOT_ASPECT_RATIOS } from "@/lib/constants";
import { generateHeadshot, isValidImageUrl, estimateProcessingTime } from "@/lib/generate-headshot";
import { headshotGenerateSchema } from "@/lib/validator";
import type { IGetImgResponseType } from "@/types";
import { eq, sql } from "drizzle-orm";
import { addCreditHistory } from "@/backend/credit-histories";

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
    const { success, data, error } = headshotGenerateSchema.safeParse(rawData);

    if (!success)
      return Response.json({ 
        message: 'Validation failed', 
        data: null, 
        statusCode: 422,
        errors: error.issues 
      }, { status: 422 });

    // Validate image URL format
    if (!isValidImageUrl(data.imageUrl))
      return Response.json({ 
        message: 'Invalid image URL format', 
        data: null, 
        statusCode: 400 
      }, { status: 400 });

    // Validate headshot style
    const headshotStyle = HEADSHOT_STYLES.find(style => style.id === data.style);
    if (!headshotStyle)
      return Response.json({ 
        message: 'Invalid headshot style', 
        data: null, 
        statusCode: 400 
      }, { status: 400 });

    // Validate aspect ratio
    const aspectRatio = HEADSHOT_ASPECT_RATIOS.find(ratio => ratio.ratio === data.aspectRatio);
    if (!aspectRatio)
      return Response.json({ 
        message: 'Invalid aspect ratio', 
        data: null, 
        statusCode: 400 
      }, { status: 400 });

    // Calculate total cost - simplified to single cost for all headshots
    const totalCost = HEADSHOT_COSTS.base_cost;

    // Check user credits
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, authUser.id));
    if (user.credits < totalCost)
      return Response.json({ 
        message: 'Insufficient credits', 
        data: {
          required: totalCost,
          available: user.credits,
          shortfall: totalCost - user.credits
        }, 
        statusCode: 402 
      }, { status: 402 });

    console.log(`Headshot generation started for user ${authUser.id}`);

    // Create initial generation record for tracking (TESTING)
    const [generation] = await db.insert(schema.headshotGenerations)
      .values({
        userId: authUser.id,
        style: headshotStyle.id,
        originalImageUrl: data.imageUrl,
        status: 'processing',
        aspectRatio: data.aspectRatio,
        quality: 'high',
        batchSize: 1,
        creditsUsed: totalCost
      })
      .returning();

    console.log(`Created generation record ${generation.id} for tracking`);

    // Generate headshot using AI service
    const startTime = Date.now();
    
    const headshotResponse = await generateHeadshot({
      imageUrl: data.imageUrl,
      style: {
        promptTemplate: headshotStyle.promptTemplate,
        negativePrompt: headshotStyle.negativePrompt
      },
      aspectRatio: aspectRatio,
      quality: 'high',
      batchSize: 1
    });

    const processingTime = Math.floor((Date.now() - startTime) / 1000);

    if (headshotResponse?.error) {
      console.error(`Headshot generation failed for user ${authUser.id}:`, headshotResponse.error);
      
      // Update generation record to failed
      await db.update(schema.headshotGenerations)
        .set({
          status: 'failed',
          errorMessage: headshotResponse.error.message
        })
        .where(eq(schema.headshotGenerations.id, generation.id));
      
      return Response.json({ 
        message: 'Headshot generation failed', 
        data: {
          error: headshotResponse.error.message,
          generationId: generation.id
        }, 
        statusCode: 400 
      }, { status: 400 });
    }

    // Update generation record with success
    await db.update(schema.headshotGenerations)
      .set({
        status: 'completed',
        resultUrls: headshotResponse.urls,
        processingTime: processingTime
      })
      .where(eq(schema.headshotGenerations.id, generation.id));

    // Deduct credits and add credit history
    await addCreditHistory(user.id, -totalCost, 'HEADSHOT_GEN');
    await db.update(schema.users)
      .set({ credits: sql<number>`${schema.users.credits}-${totalCost}` })
      .where(eq(schema.users.id, authUser.id));

    console.log(`Headshot generated successfully for user ${authUser.id}. Generation ID: ${generation.id}, URL: ${headshotResponse.urls[0]?.substring(0, 50)}..., Cost: ${totalCost} credits, Processing time: ${processingTime}s`);

    // Return result with generation tracking
    return Response.json({ 
      message: 'Headshot generated successfully', 
      data: {
        generationId: generation.id, // For debugging
        url: headshotResponse.urls[0],
        creditsUsed: totalCost,
        remainingCredits: user.credits - totalCost,
        processingTime: processingTime,
        style: headshotStyle.name
      }, 
      statusCode: 200 
    }, { status: 200 });

  } catch (error) {
    console.error("Error in headshot generation:", error);
    return Response.json({ 
      message: "Unable to process headshot request at the moment.", 
      data: null, 
      statusCode: 500 
    }, { status: 500 });
  }
}

// GET endpoint to retrieve available styles and configuration
export async function GET(req: Request) {
  try {
    return Response.json({
      message: 'Headshot configuration retrieved',
      data: {
        styles: HEADSHOT_STYLES.map(style => ({
          id: style.id,
          name: style.name,
          description: style.description,
          creditCost: style.creditCost,
          isPremium: style.isPremium
        })),
        aspectRatios: HEADSHOT_ASPECT_RATIOS,
        qualityOptions: [
          { level: 'standard', credits: HEADSHOT_COSTS.base_cost, description: 'Good quality - Fast processing' },
          { level: 'high', credits: HEADSHOT_COSTS.base_cost, description: 'High quality - Balanced speed and quality' },
          { level: 'ultra', credits: HEADSHOT_COSTS.base_cost, description: 'Ultra quality - Best results' }
        ],
        costs: HEADSHOT_COSTS
      },
      statusCode: 200
    }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving headshot config:", error);
    return Response.json({
      message: "Unable to retrieve configuration",
      data: null,
      statusCode: 500
    }, { status: 500 });
  }
}