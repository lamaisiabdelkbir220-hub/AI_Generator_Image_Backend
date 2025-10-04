import db from "@/db";
import * as schema from '@/db/schema';
import { eq, and, lte, isNotNull } from "drizzle-orm";
import { deleteImageFromFirebase } from '@/lib/firebase-storage';

/**
 * Clean up original images that were successfully generated 30+ minutes ago
 * This function should be called by a scheduled job (cron/background task)
 */
export async function cleanupOldOriginalImages() {
  try {
    // Calculate timestamp for 30 minutes ago
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    console.log('Starting cleanup of original images older than 30 minutes...');

    // Find completed generations with original images that are older than 30 minutes
    const oldGenerations = await db
      .select()
      .from(schema.headshotGenerations)
      .where(
        and(
          eq(schema.headshotGenerations.status, 'completed'),
          lte(schema.headshotGenerations.updatedAt, thirtyMinutesAgo),
          isNotNull(schema.headshotGenerations.originalImageUrl)
        )
      );

    console.log(`Found ${oldGenerations.length} images to clean up`);

    let deletedCount = 0;
    let failedCount = 0;

    // Delete each original image from Firebase
    for (const generation of oldGenerations) {
      if (generation.originalImageUrl) {
        const deleted = await deleteImageFromFirebase(generation.originalImageUrl);

        if (deleted) {
          // Clear the originalImageUrl from database
          await db
            .update(schema.headshotGenerations)
            .set({ originalImageUrl: null })
            .where(eq(schema.headshotGenerations.id, generation.id));

          deletedCount++;
          console.log(`Deleted original image for generation ${generation.id}`);
        } else {
          failedCount++;
          console.warn(`Failed to delete original image for generation ${generation.id}`);
        }
      }
    }

    const result = {
      total: oldGenerations.length,
      deleted: deletedCount,
      failed: failedCount,
      timestamp: new Date().toISOString()
    };

    console.log('Cleanup completed:', result);
    return result;

  } catch (error) {
    console.error('Error during image cleanup:', error);
    throw error;
  }
}

/**
 * Clean up failed generation images immediately
 * Called when a generation fails
 */
export async function cleanupFailedGeneration(generationId: number) {
  try {
    const [generation] = await db
      .select()
      .from(schema.headshotGenerations)
      .where(eq(schema.headshotGenerations.id, generationId));

    if (generation && generation.originalImageUrl) {
      const deleted = await deleteImageFromFirebase(generation.originalImageUrl);

      if (deleted) {
        await db
          .update(schema.headshotGenerations)
          .set({ originalImageUrl: null })
          .where(eq(schema.headshotGenerations.id, generationId));

        console.log(`Cleaned up failed generation ${generationId}`);
      }
    }
  } catch (error) {
    console.error(`Error cleaning up failed generation ${generationId}:`, error);
  }
}