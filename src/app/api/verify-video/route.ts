import { db } from "@/db";
import { history, Setting, setting, tasks, users, videoDone, videos } from "@/db/schema";
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
      status: 0,
    });
    await db
      .update(users)
      .set({
        coins: sql`${users.coins} + ${task[0].coins}`,
      })
      .where(eq(users.chatId, dtata.chat_id));
    const refers:Setting[] = await db.select().from(setting).where(eq(setting.id, 1));
    const amount: number = task[0].coins;
    const refer1: number = refers[0].refer1 || 0;
    const refer2: number = refers[0].refer2 || 0;
    const refer3: number = refers[0].refer3 || 0;
    const refer1add: number = (amount * refer1) / 100;
    const refer2add: number = (amount * refer2) / 100;
    const refer3add: number = (amount * refer3) / 100;
    // Check if user has referred before and update their level accordingly.
    let level1KaRefer =
        (await db.select().from(users).where(eq(users.chatId, chat_id))).at(0)
          ?.refer || 0;
      let level2KaRefer =
        (
          await db.select().from(users).where(eq(users.chatId, level1KaRefer))
        ).at(0)?.refer || 0;
      let level3karefer =
        (
          await db.select().from(users).where(eq(users.chatId, level2KaRefer))
        ).at(0)?.refer || 0;
      if (level1KaRefer !== 0) {
        await db
          .update(users)
          .set({
            level1: sql`${users.level1} + ${refer1add}`,
          })
          .where(eq(users.chatId, level1KaRefer));
      }
      if (level2KaRefer!== 0) {
        await db
          .update(users)
          .set({
            level2: sql`${users.level2} + ${refer2add}`,
          })
          .where(eq(users.chatId, level2KaRefer));
      }
      if (level3karefer!== 0) {
        await db
          .update(users)
          .set({
            level3: sql`${users.level3} + ${refer3add}`,
          })
          .where(eq(users.chatId, level3karefer));
      }
    // Update user's coins and return success response.

    // Validate code against user's code and return success response.
    return Response.json({ success: true });
  } catch (err) {
    console.log(err);
    return Response.json({ error: "An error occurred" });
  }
}
