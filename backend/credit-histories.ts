import db from "@/db";
import * as schema from '@/db/schema'
import type { ICreditHistoryType } from "@/types";

export async function addCreditHistory(userId: number, amount: number, type: ICreditHistoryType) {
  try {
    await db.insert(schema.creditHistories).values({ userId: userId, amount: amount, type: type });
  } catch (error) {
    console.log("Error adding credit history record", error);
  }
}