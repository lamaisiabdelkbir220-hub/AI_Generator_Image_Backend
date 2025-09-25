import env from "@/lib/env";

export async function GET() {
  try {
    // Test if environment variables are loaded correctly
    const envTest = {
      hasGetImageToken: !!env.GETIMAGE_AI_TOKEN,
      hasDatabaseUrl: !!env.DATABASE_URL,
      hasFirebaseBase64: !!env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      tokenSecret: env.TOKEN_SECRET.substring(0, 5) + "...", // Only show first 5 chars
      contactEmail: env.CONTACT_EMAIL,
      websiteUrl: env.WEBSITE_URL,
    };
    
    return Response.json({
      message: "Environment variables test",
      data: envTest,
      statusCode: 200
    });
  } catch (error) {
    console.error("Environment error:", error);
    
    return Response.json({
      message: "Environment variables failed",
      data: { error: error instanceof Error ? error.message : String(error) },
      statusCode: 500
    }, { status: 500 });
  }
}