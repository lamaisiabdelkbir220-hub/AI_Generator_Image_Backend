import db from "@/db";
import * as schema from "@/db/schema";
import env from "@/lib/env";
import { headers } from "next/headers";

export async function POST(_: Request) {
  try {
    // This route is only for internal use
    const headerList = await headers();

    const adminSecret = headerList.get('x-admin-secret');

    if (adminSecret !== env.ADMIN_SECRET)
      return Response.json(
        { message: "FORBIDDEN", data: null, statusCode: 403 },
        { status: 403 }
      );

    await db.update(schema.users).set({ noOfAdsWatch: 0 });

    return Response.json(
      { message: "Ads reset successfully", data: null, statusCode: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting ads watch count:", error);
    return Response.json(
      { message: "Unable to process request at the moment.", data: null, statusCode: 400 },
      { status: 400 }
    );
  }
}