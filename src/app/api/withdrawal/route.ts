import { error } from "console";
import { db } from "@/db";
import { history, users, withdwaral } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import type { NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return Response.json("");
}
export async function POST(request: NextRequest) {
  try {
    const dtata: { chat_id: number; payment: string; uid: number } =
      await request.json();
    const chat_id = dtata.chat_id;
    const selection = dtata.payment;
    const uid = dtata.uid;
    const coins = [
      { name: "Pepe", points: 1000, value: 3000 },
      { name: "Shiba Inu", points: 1000, value: 1500 },
      { name: "Bonk", points: 1000, value: 1100 },
    ];
    if (!chat_id || !uid) {
      return Response.json({ error: "Invalid Data" });
    }
    const coin = coins.find((c) => c.name == selection);
    console.log(coin);
    if (!coin) {
      return Response.json({ error: "Invalid Coin Selection" });
    }
    const user = (
      await db.select().from(users).where(eq(users.chatId, chat_id))
    ).at(0);
    const earnCoin = user?.coins || 0;
    const level1Bal = user?.level1 || 0;
    const level2Bal = user?.level2 || 0;
    const level3Bal = user?.level3 || 0;
    const withdrawBal = user?.withdraw || 0;
    const totalReferbal = level1Bal + level2Bal + level3Bal;
    const totalBal = earnCoin + totalReferbal;
    const totalBalance = parseInt((totalBal - withdrawBal).toFixed(2));
    try {
      if (totalBalance <= 1000) {
        return Response.json({ error: "Insufficient Balance" });
      }
      await db
        .update(users)
        .set({
          withdraw: sql`${users.withdraw} + ${totalBalance}`,
        })
        .where(eq(users.chatId, chat_id));
      await db.insert(history).values({
        chatId: chat_id,
        name: "Withdraw",
        coin: totalBalance,
        status: 1,
      });
      const dtata = (totalBalance * coin.value) / 1000;
      await db.insert(withdwaral).values({
        chatId: chat_id,
        address: uid.toString(),
        method: coin.name + " " + dtata,
        coins: totalBalance,
        status: 0,
      });
      return Response.json({
        success: "Withdrawal Successfully Added!",
      });
    } catch (err) {
      console.error(err);
      return Response.json({ error: "Something Wrong!" });
    }
  } catch (error: any) {
    return Response.json({
      error: "Something Wrong!",
    });
  }
}
