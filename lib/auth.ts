import { headers } from "next/headers";
import type { users } from '@/db/schema'
import { decodeToken } from "./jwt";

type IUser = typeof users.$inferSelect;

export async function auth(_: Request) {
  const headersList = await headers();
  const authorizationHeader = headersList.get('authorization');
  const token = authorizationHeader?.split(' ')[1];

  if (!token) return null;

  try {
    const data = decodeToken(token);
    if (!data) return null;

    return data as IUser;
  } catch (error) {
    console.log("Authentication error", error);
    return null;
  }
}