import { auth } from "@/lib/auth";
import env from "@/lib/env";

export async function POST(req: Request) {
  try {
    console.log("=== Generate Test Debug ===");
    
    // Test 1: Authentication
    console.log("Testing authentication...");
    const authUser = await auth(req);
    if (!authUser) {
      return Response.json({ 
        error: "Authentication failed", 
        step: "auth",
        statusCode: 401 
      }, { status: 401 });
    }
    console.log("✅ Auth successful, user ID:", authUser.id);

    // Test 2: Environment Variables
    console.log("Testing environment variables...");
    const envTest = {
      hasGetImageToken: !!env.GETIMAGE_AI_TOKEN,
      hasDatabaseUrl: !!env.DATABASE_URL,
      hasTokenSecret: !!env.TOKEN_SECRET,
      getImageTokenLength: env.GETIMAGE_AI_TOKEN?.length || 0
    };
    console.log("Env test:", envTest);

    // Test 3: Request Body
    console.log("Testing request body...");
    const rawData = await req.json();
    console.log("Request data:", rawData);

    // Test 4: GetImage.ai Token Format
    const tokenStartsCorrect = env.GETIMAGE_AI_TOKEN?.startsWith('gim_');
    console.log("Token format check:", { tokenStartsCorrect });

    return Response.json({
      message: "Debug test completed",
      data: {
        authUser: { id: authUser.id, email: authUser.email },
        envTest,
        requestData: rawData,
        tokenFormatOk: tokenStartsCorrect
      },
      statusCode: 200
    });

  } catch (error) {
    console.error("=== Debug Test Error ===");
    console.error("Error details:", error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : undefined);

    return Response.json({
      error: "Debug test failed",
      details: error instanceof Error ? error.message : String(error),
      statusCode: 500
    }, { status: 500 });
  }
}