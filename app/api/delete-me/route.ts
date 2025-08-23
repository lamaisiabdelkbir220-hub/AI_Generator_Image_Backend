import db from "@/db";
import * as schema from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();

        const [user] = await db.select().from(schema.users).where(eq(schema.users.socialId, userId));

        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        if (user.isDeleted) {
            return Response.json({ message: "User has been deleted" }, { status: 400 });
        } else {
            await db
                .update(schema.users)
                .set({ isDeleted: true, deletedAt: sql`now()` })
                .where(eq(schema.users.socialId, userId));
        }

        return Response.json({ message: "User deleted successfully", data: null, statusCode: 200 }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return Response.json({ message: "Unable to process request at the moment." }, { status: 400 });
    }
}
