import env from "@/lib/env";

export async function GET() {
  try {
    // Note: GetImg.ai doesn't have a direct credit check endpoint
    // This is a placeholder that attempts to get account info
    
    const testUrl = 'https://api.getimg.ai/v1/account/balance';
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${env.GETIMAGE_AI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return Response.json({
        message: "Credit check successful",
        data: data,
        statusCode: 200
      });
    } else {
      // If balance endpoint doesn't exist, return general info
      return Response.json({
        message: "GetImg.ai credit check not available",
        data: {
          note: "GetImg.ai free plan provides 100 credits per month",
          textToImageCost: 3,
          imageToImageCost: 5,
          estimatedGenerations: "~33 text-to-image or ~20 image-to-image per month"
        },
        statusCode: 200
      });
    }

  } catch (error) {
    return Response.json({
      message: "Credit check failed",
      data: { error: error instanceof Error ? error.message : String(error) },
      statusCode: 500
    }, { status: 500 });
  }
}