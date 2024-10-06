import { db } from "@/db";
import { taskDone } from "@/db/schema";
import { and, eq } from "drizzle-orm";
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
  const chatId = "5410358211" //"1055841612"
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
    formData2.append("reply_markup", JSON.stringify(replyMarkup));
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
      return Response.json({ success: "Uploaded photo successfully" });
    }
    return Response.json({ error: "error" });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
}
