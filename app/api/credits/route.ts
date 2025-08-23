import db from "@/db";
import * as schema from '@/db/schema'
import { auth } from "@/lib/auth";
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

    const history = await db
      .select({
        amount: schema.creditHistories.amount,
        type: schema.creditHistories.type,
        date: schema.creditHistories.createdAt
      })
      .from(schema.creditHistories)
      .where(eq(schema.creditHistories.userId, authUser.id));

    // get how much earn and how much spend in different variables

    let totalCreditsEarn = 0;
    let totalCreditsSpend = 0;

    const totalHistory = history.length;
    for (let idx = 0; idx < totalHistory; idx++) {
      const _history = history[idx];

      if (_history.amount > 0) totalCreditsEarn += _history.amount;
      else if (_history.amount < 0) totalCreditsSpend -= _history.amount;
    }

    totalCreditsSpend = Math.abs(totalCreditsSpend);

    const data = {
      balance: user.credits,
      totalCreditsEarn,
      totalCreditsSpend,
      totalAdsWatch: user.noOfAdsWatch,
      history: history
    }

    return Response.json({ message: "Credit record", data: data, statusCode: 200 }, { status: 200 });
  } catch (error) {
    console.error("Error getting credits data:", error);
    return Response.json(
      { message: "Unable to process request at the moment.", data: null, statusCode: 400 },
      { status: 400 }
    );
  }
}