import db from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { addCreditHistory } from "@/backend/credit-histories";

export async function POST(req: Request) {
    try {
        const authUser = await auth(req);

        if (!authUser)
            return Response.json({ message: 'Authentication required', data: null, statusCode: 401 }, { status: 401 });

        const [user] = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.id, authUser.id));

        if (!user) {
            return Response.json(
                { message: "User not found", data: null, statusCode: 404 },
                { status: 404 }
            );
        }

        if (user.isDeleted) {
            return Response.json(
                { message: "User has been deleted", data: null, statusCode: 400 },
                { status: 400 }
            );
        }

        const randomValue = Math.random();
        let randomCredits;

        if (randomValue < 0.8)
            randomCredits = Math.floor(Math.random() * (5 - 1 + 1) + 1);
        else
            randomCredits = Math.floor(Math.random() * (7 - 5 + 1) + 5);

        await db
            .update(schema.users)
            .set({
                credits: user.credits + randomCredits,
                noOfAdsWatch: user.noOfAdsWatch + 1,
            })
            .where(eq(schema.users.id, authUser.id));

        await addCreditHistory(user.id, randomCredits, 'ADS_REWARD');

        return Response.json(
            { message: "Reward claimed successfully", data: randomCredits, statusCode: 200 },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error claiming reward:", error);
        return Response.json(
            { message: "Unable to process request at the moment.", data: null, statusCode: 400 },
            { status: 400 }
        );
    }
}
