import { db } from "@/db";
import { taskDone } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

import { history, Setting, setting, tasks, users } from "@/db/schema";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  const BOT_TOKEN = "8101809542:AAGvcWjsRCqF6EAqISEQItPk98u9noqfNzg";
  const response = await fetch(
    `https://api.telegram.org/bot8101809542:AAGvcWjsRCqF6EAqISEQItPk98u9noqfNzg/getFile?file_id=AgACAgUAAxkDAAM8ZwFTk8NAoK-jYxfmnECQpScx0H0AAoXCMRv_LxBUnG-cD5gPhLsBAAMCAANtAAM2BA`
  );
  const data = await response.json();

  // Validate token and chat_id here. If invalid, return error response.
  return Response.json(data);
}

export async function POST(request: NextRequest) {
  const botToken = "8101809542:AAGvcWjsRCqF6EAqISEQItPk98u9noqfNzg";
  const chatId = "7749203184" //"5410358211" //"1055841612"
  try {
    const formData = await request.formData();
    if (!formData.has("file")) {
      throw new Error("No file uploaded");
    }
    const file = formData.get("file");
    const chatiId = formData.get("chatId");
    const videoid = formData.get("videoid");

    const videolink = formData.get("videolink");

    const videoname = formData.get("videoname");
    var cId: number = 0;
    var tId: number = 0;
    if (typeof chatiId === "number" && typeof videoid === "number") {
      cId = chatiId;
      tId = videoid;
    }else if (typeof chatiId === "string" && typeof videoid === "string") {
        cId = parseInt(chatiId);
        tId = parseInt(videoid);
    }
    const hist = await db
      .select()
      .from(taskDone)
      .where(and(eq(taskDone.chat_id, cId), eq(taskDone.task_id, tId)));
    if (hist.length > 0) {
      return Response.json({ error: "Already Uploaded" });
    }
    if (!file) {
      throw new Error("Invalid file uploaded");
    }
    const formData2 = new FormData();
    formData2.append("chat_id", chatId);
    formData2.append("photo", file);
    formData2.append(
      "caption",
      "Task ID :- " +
        videoid +
        "\n" +
        "Task Name :- " +
        videoname +
        "\n" +
        "Task Link :- " +
        videolink +
        "\n" +
        "Chat Id : " +
        chatiId
    );
    const replyMarkup = {
      inline_keyboard: [
        [
          {
            text: "Verification",
            url:
              "https://coinrush.pages.dev/admin/verification?id=" +
              chatiId +
              "&taskid=" +
              videoid,
          },
        ],
      ],
    };
    // formData2.append("reply_markup", JSON.stringify(replyMarkup));
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendPhoto`,
      {
        method: "POST",
        body: formData2,
      }
    );
    const data: any = await response.json();
    if (data.ok) {
      await db.insert(taskDone).values({
        chat_id: cId,
        task_id: tId,
      });
      try {
        const chat_id: number = cId;
        const task_id: number = tId;
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
      // return Response.json({ success: "Uploaded photo successfully" });
    }
    return Response.json({ error: "error" });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
}
