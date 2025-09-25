// Updated pricing/plans/route.ts with platform support

import db from "@/db";
import * as schema from '@/db/schema'
import { auth } from "@/lib/auth";
import { ANDROID_PRICING_PLANS, IOS_PRICING_PLANS, ALL_PRICING_PLANS } from "@/lib/constants";
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

    // Get platform from query params or user device type
    const url = new URL(req.url);
    const platform = url.searchParams.get('platform') || user.deviceType;

    let pricingPlans;
    
    // Return platform-specific plans
    if (platform?.toLowerCase().includes('ios') || platform?.toLowerCase().includes('iphone')) {
      pricingPlans = IOS_PRICING_PLANS.map(it => ({ ...it, credits: undefined }));
    } else if (platform?.toLowerCase().includes('android')) {
      pricingPlans = ANDROID_PRICING_PLANS.map(it => ({ ...it, credits: undefined }));
    } else {
      // Return all plans if platform is unknown
      pricingPlans = ALL_PRICING_PLANS.map(it => ({ ...it, credits: undefined }));
    }

    return Response.json({ 
      message: "Pricing plans", 
      data: {
        platform: platform || 'unknown',
        plans: pricingPlans
      }, 
      statusCode: 200 
    }, { status: 200 });
  } catch (error) {
    console.error("Error getting product ids:", error);
    return Response.json(
      { message: "Unable to process request at the moment.", data: null, statusCode: 400 },
      { status: 400 }
    );
  }
}