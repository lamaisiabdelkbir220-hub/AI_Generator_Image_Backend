import db from "@/db";
import * as schema from "@/db/schema";
import { auth } from "@/lib/auth";
import { IdSchema } from "@/lib/validator";
import { and, eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const rawData = await req.json();
        const { success, data, error } = IdSchema.safeParse(rawData);
        if (!success) {
            return Response.json(
                { message: "Validation failed" },
                { status: 422 }
            );
        }

        const [user] = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.deviceId, data.deviceId));

        if (!user) {
            return Response.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (user.isDeleted) {
            return Response.json(
                { message: "User has been deleted" },
                { status: 400 }
            );
        }

        return Response.json(
            { message: "User found successfully", data: user },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user:", error);
        return Response.json(
            { message: "Unable to process request at the moment." },
            { status: 400 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const authUser = await auth(req);

        if (!authUser)
            return Response.json({ message: 'Authentication required', data: null, statusCode: 400 }, { status: 400 });

        const [user] = await db.select().from(schema.users).where(and(eq(schema.users.id, authUser.id), eq(schema.users.isDeleted, false)));

        if (!user)
            return Response.json({ message: 'User not found', data: null, statusCode: 404 }, { status: 404 });

        const history = await db
            .select({
                amount: schema.creditHistories.amount,
                type: schema.creditHistories.type,
                date: schema.creditHistories.createdAt
            })
            .from(schema.creditHistories)
            .where(eq(schema.creditHistories.userId, authUser.id));

        let totalCreditsEarn = 0;
        let totalCreditsSpend = 0;

        const totalHistory = history.length;
        for (let idx = 0; idx < totalHistory; idx++) {
            const _history = history[idx];

            if (_history.amount > 0) totalCreditsEarn += _history.amount;
            else if (_history.amount < 0) totalCreditsSpend -= _history.amount;
        }

        totalCreditsSpend = Math.abs(totalCreditsSpend);

        const userCredits = {
            balance: user.credits,
            totalCreditsEarn,
            totalCreditsSpend,
            totalAdsWatch: user.noOfAdsWatch,
            // history: history
        }

        return Response.json({ message: 'User details', data: { ...user, ...userCredits }, statusCode: 200 }, { status: 200 });
    } catch (error) {
        console.error("Unable to get user details:", error);
        return Response.json({ message: "Unable to process request at the moment.", data: null, statusCode: 400 }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        const authUser = await auth(req);

        if (!authUser)
            return Response.json({ message: 'Authentication required', data: null, statusCode: 400 }, { status: 400 });

        const [user] = await db.select().from(schema.users).where(and(eq(schema.users.id, authUser.id), eq(schema.users.isDeleted, false)));

        if (!user)
            return Response.json({ message: 'User not found', data: null, statusCode: 404 }, { status: 404 });

        await db.update(schema.users).set({ isDeleted: true, deletedAt: sql`now()` }).where(eq(schema.users.id, authUser.id));

        return Response.json({ message: 'User deleted successfully', data: null, statusCode: 200 }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return Response.json({ message: "Unable to process request at the moment." }, { status: 400 });
    }
}
