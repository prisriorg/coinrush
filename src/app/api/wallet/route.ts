import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return Response.json("");
}
export async function POST(request: NextRequest) {
  const dtata: { chat_id: number } = await request.json();
  const chat_id = dtata.chat_id;

  if (!chat_id) {
    return Response.json({ error: "Invalid chat_id" });
  }
  const user = (await db.select().from(users).where(eq(users.chatId, chat_id))).at(0);
  // await db.update(users).set({coins:6565}).where(eq(users.chatId, chat_id)).execute();
  const earnCoin = user?.coins || 0;
  const level1Bal = user?.level1 || 0;
  const level2Bal = user?.level2 || 0;
  const level3Bal = user?.level3 || 0;
  const withdrawBal = user?.withdraw || 0;
  const totalReferbal = (level1Bal + level2Bal + level3Bal);
  const totalBalance = (earnCoin + totalReferbal) - withdrawBal;

  const data = {
    balance: totalBalance,
    totalReferbal,
    level1Bal,
    level2Bal,
    level3Bal,
  };
  return Response.json(data);
}
