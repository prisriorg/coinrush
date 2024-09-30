import { db } from "@/db";
import { history } from "@/db/schema";
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
    return Response.json([]);
  }
  const histo = await db
    .select({
      id: history.id,
      name: history.name,
      coin: history.coin,
      status: history.status,
    })
    .from(history)
    .where(eq(history.chatId, chat_id))
    .limit(25);
  return Response.json(histo);
}
