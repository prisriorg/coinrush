import { db } from "@/db";
import { history, setting, tasks, users, videoDone, videos } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  // Validate token and chat_id here. If invalid, return error response.
  return Response.json({});
}

export async function POST(request: NextRequest) {
  try {
    const dtata: { chat_id: number; id: number; code: number } =
      await request.json();
    const chat_id = dtata.chat_id;
    if (!chat_id || !dtata.id || !dtata.code) {
      return Response.json({ error: "Invalid request data" });
    }
    const hist = await db
      .select()
      .from(videoDone)
      .where(
        and(
          eq(videoDone.chatId, dtata.chat_id),
          eq(videoDone.videoId, dtata.id)
        )
      );
    if (hist.length > 0) {
      return Response.json({ error: "Already entered the code" });
    }
    const task = await db
      .select()
      .from(videos)
      .where(eq(videos.code, dtata.code));
    if (task.length === 0) {
      return Response.json({ error: "Invalid code" });
    }
    await db.insert(videoDone).values({
      chatId: dtata.chat_id,
      videoId: dtata.id,
    });
    await db.insert(history).values({
      chatId: dtata.chat_id,
      name: "Video Watch",
      coin: task[0].coins,
      status: 1,
    });
    const refers = await db.select().from(setting).where(eq(setting.id, 1));
    const amount: number = task[0].coins;
    const refer1: number = refers[0].refer1 || 0;
    const refer2: number = refers[0].refer2 || 0;
    const refer3: number = refers[0].refer3 || 0;
    const refer1add: number = (amount * refer1) / 100;
    const refer2add: number = (amount * refer2) / 100;
    const refer3add: number = (amount * refer3) / 100;
    let level1 = await db
      .select()
      .from(users)
      .where(eq(users.chatId, dtata.chat_id));
    if (level1.length !== 0) {
      await db
        .update(users)
        .set({
          level1: sql`${users.level1} + ${refer1add}`,
        })
        .where(eq(users.chatId, dtata.chat_id)); // assuming you are updating by user ID

      let level2 = await db
        .select()
        .from(users)
        .where(eq(users.chatId, level1[0].refer));
      if (level2.length !== 0) {
        await db
          .update(users)
          .set({
            level2: sql`${users.level2} + ${refer2add}`,
          })
          .where(eq(users.chatId, level2[0].refer)); // assuming you are updating by user ID
        let level3 = await db
          .select()
          .from(users)
          .where(eq(users.chatId, dtata.chat_id));

        if (level3.length !== 0) {
          await db
            .update(users)
            .set({
              level3: sql`${users.level3} + ${refer3add}`,
            })
            .where(eq(users.chatId, level3[0].refer));
        }
      }
    }
    // Update user's coins and return success response.

    // Validate code against user's code and return success response.
    return Response.json({ success: true });
  } catch (err) {
    console.log(err);
    return Response.json({ error: "An error occurred" });
  }
}
