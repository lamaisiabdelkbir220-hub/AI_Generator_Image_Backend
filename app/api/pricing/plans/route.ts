import db from "@/db";
import * as schema from '@/db/schema'
import { auth } from "@/lib/auth";
import { ANDROID_PRICING_PLANS } from "@/lib/constants";
import { and, eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const authUser = await auth(req);

    if (!authUser)
      return Response.json({ message: 'Authentication required', data: null, statusCode: 401 }, { status: 401 });

    const [user] = await db
      .select()
      .from(schema.users)
      .where(and(eq(schema.users.id, authUser.id), eq(schema.users.isDeleted, false)));

    if (!user)
      return Response.json(
        { message: "User not found", data: null, statusCode: 404 },
        { status: 404 }
      );

    const pricingPlans = ANDROID_PRICING_PLANS.map(it => ({ ...it, credits: undefined }));

    return Response.json({ message: "Pricing plans", data: pricingPlans, statusCode: 200 }, { status: 200 });
  } catch (error) {
    console.error("Error getting product ids:", error);
    return Response.json(
      { message: "Unable to process request at the moment.", data: null, statusCode: 400 },
      { status: 400 }
    );
  }
}