import env from "@/lib/env";

export async function GET() {
  try {
    console.log("Testing GetImg.ai API key...");
    
    // Test a simple API call to check if the key works
    const testUrl = 'https://api.getimg.ai/v1/models';
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${env.GETIMAGE_AI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      return Response.json({
        message: "GetImg.ai API key is working!",
        data: {
          status: "SUCCESS",
          availableModels: data.length || "Unknown",
          keyFormat: env.GETIMAGE_AI_TOKEN?.substring(0, 8) + "...",
          keyLength: env.GETIMAGE_AI_TOKEN?.length
        },
        statusCode: 200
      });
    } else {
      return Response.json({
        message: "GetImg.ai API key test failed",
        data: {
          status: "FAILED",
          error: data,
          keyFormat: env.GETIMAGE_AI_TOKEN?.substring(0, 8) + "...",
          keyLength: env.GETIMAGE_AI_TOKEN?.length
        },
        statusCode: 400
      }, { status: 400 });
    }

  } catch (error) {
    console.error("GetImg.ai API test error:", error);
    
    return Response.json({
      message: "GetImg.ai API test error",
      data: {
        status: "ERROR",
        error: error instanceof Error ? error.message : String(error),
        keyFormat: env.GETIMAGE_AI_TOKEN?.substring(0, 8) + "..."
      },
      statusCode: 500
    }, { status: 500 });
  }
}