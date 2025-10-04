import { cleanupOldOriginalImages } from '@/lib/cleanup-images';
import env from '@/lib/env';
import { NextRequest } from 'next/server';

/**
 * API endpoint to manually trigger image cleanup
 * This should be called by a cron job every hour
 * 
 * Example cron setup (Vercel):
 * In vercel.json add:
 * {
 *   "crons": [{
 *     "path": "/api/cleanup/images",
 *     "schedule": "0 * * * *"
 *   }]
 * }
 */
export async function GET(req: NextRequest) {
  try {
    // Optional: Add authentication to prevent unauthorized access
    const authHeader = req.headers.get('authorization');
    const cronSecret = env.CRON_SECRET;

    // If CRON_SECRET is set, validate it
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return Response.json(
        { 
          message: 'Unauthorized', 
          statusCode: 401 
        }, 
        { status: 401 }
      );
    }

    console.log('Starting scheduled image cleanup...');

    // Run the cleanup
    const result = await cleanupOldOriginalImages();

    return Response.json({
      message: 'Image cleanup completed successfully',
      data: result,
      statusCode: 200
    }, { status: 200 });

  } catch (error) {
    console.error('Error in cleanup endpoint:', error);
    
    return Response.json({
      message: 'Image cleanup failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500
    }, { status: 500 });
  }
}

/**
 * POST endpoint for manual cleanup (for testing)
 */
export async function POST(req: NextRequest) {
  try {
    const result = await cleanupOldOriginalImages();

    return Response.json({
      message: 'Manual cleanup completed',
      data: result,
      statusCode: 200
    }, { status: 200 });

  } catch (error) {
    console.error('Error in manual cleanup:', error);
    
    return Response.json({
      message: 'Cleanup failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500
    }, { status: 500 });
  }
}