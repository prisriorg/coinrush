import { db } from "@/db";
import { history, Setting, setting, tasks, users } from "@/db/schema";
import { error } from "console";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  // Validate token and chat_id here. If invalid, return error response.
  return Response.json({});
}

export async function POST(request: NextRequest) {
  try {
    const dtata: { id: number; tId: number } = await request.json();
    const chat_id: number = dtata.id;
    const task_id: number = dtata.tId;
    if (!chat_id || !task_id) {
      return Response.json({ error: "Invalid request data" });
    }
    const histo = await db
      .select()
      .from(history)
      .where(
        and(eq(history.chatId, chat_id), eq(history.name, "Task " + task_id))
      );
    if (histo.length > 0) {
      return Response.json({ error: "Task already completed" });
    }
    const task = await db.select().from(tasks).where(eq(tasks.id, task_id));
    if (task.length > 0) {
      await db
        .update(users)
        .set({
          coins: sql`${users.coins} + ${task[0].coins}`,
        })
        .where(eq(users.chatId, chat_id));
      await db.insert(history).values({
        chatId: chat_id,
        name: "Task " + task_id,
        coin: task[0].coins,
        status: 0,
      });
      const refers: Setting[] = await db
        .select()
        .from(setting)
        .where(eq(setting.id, 1));
      const amount: number = task[0].coins;
      const refer1: number = refers[0].refer1 || 0;
      const refer2: number = refers[0].refer2 || 0;
      const refer3: number = refers[0].refer3 || 0;
      const refer1add: number = (amount * refer1) / 100;
      const refer2add: number = (amount * refer2) / 100;
      const refer3add: number = (amount * refer3) / 100;
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
      if (level2KaRefer !== 0) {
        await db
          .update(users)
          .set({
            level2: sql`${users.level2} + ${refer2add}`,
          })
          .where(eq(users.chatId, level2KaRefer));
      }
      if (level3karefer !== 0) {
        await db
          .update(users)
          .set({
            level3: sql`${users.level3} + ${refer3add}`,
          })
          .where(eq(users.chatId, level3karefer));
      }
      return Response.json({ success: "Task completed successfully" });
    }
  } catch (err) {
    console.log(err);
    return Response.json({ error: "An error occurred" });
  }
}
