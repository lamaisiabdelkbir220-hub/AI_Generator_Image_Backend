import db from "@/db";
import * as schema from "@/db/schema";
import { decodeToken, generateToken } from "@/lib/jwt";
import { authRefreshSchema, userSchema } from "@/lib/validator";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const rawData = await req.json();
    const { success, data, error } = authRefreshSchema.safeParse(rawData);

    if (!success)
      return Response.json(
        { message: "Validation failed", data: null, statusCode: 422 },
        { status: 422 }
      );

    const isValidToken = decodeToken(data.token) as { id: number };

    if (!isValidToken)
      return Response.json(
        { message: "Invalid Token", data: null, statusCode: 400 },
        { status: 400 }
      );

    const [user] = await db
      .select()
      .from(schema.users)
      .where(and(eq(schema.users.id, isValidToken.id), eq(schema.users.isDeleted, false)))

    if (!user)
      return Response.json(
        { message: "User not found", data: null, statusCode: 404 },
        { status: 404 }
      );

    if (user.token !== data.token)
      return Response.json(
        { message: "Invalid Token", data: null, statusCode: 400 },
        { status: 400 }
      );

    const accessToken = generateToken(user);

    return Response.json(
      { message: "New access token generated", data: accessToken, statusCode: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Unable to process request at the moment.", data: null, statusCode: 400 },
      { status: 400 }
    );
  }
}