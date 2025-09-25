import db from "@/db";
import * as schema from "@/db/schema";

export async function GET() {
  try {
    // Simple database test
    const result = await db.select().from(schema.users).limit(1);
    
    return Response.json({
      message: "Database connection successful",
      data: { connectionTest: "PASS", userCount: result.length },
      statusCode: 200
    });
  } catch (error) {
    console.error("Database connection error:", error);
    
    return Response.json({
      message: "Database connection failed",
      data: { error: error instanceof Error ? error.message : String(error) },
      statusCode: 500
    }, { status: 500 });
  }
}