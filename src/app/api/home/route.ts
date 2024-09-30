import { eq, isNull, and } from "drizzle-orm";
import { db } from "@/db";
import { games, taskDone, tasks, users, videoDone, videos } from "@/db/schema";
import type { NextRequest } from "next/server";
import { platform } from "os";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  await db.insert(videos).values({
    videoId:"https://youtu.be/gNFCeKH3_gA?si=z6rtNMQKBVSETfhJ",
    coins:10,
    code:353279
  }).execute()

  // try{
  //   await db.insert(videoDone).values({
  //     videoId: 1,
  //     chatId: 1234567,
  //   }).execute();
  // }catch(err){
  //   console.log(err);
  // }

  return Response.json("");
}
export async function POST(request: NextRequest) {
  const dtata: { chat_id: number } = await request.json();
  const chat_id = dtata.chat_id;

  if (!chat_id) {
    return Response.json([]);
  }

  const task = await db
    .select({
      id: tasks.id,
      platform: tasks.platform,
      name: tasks.name,
      coins: tasks.coins,
      link: tasks.link,
      createdAt: tasks.createdAt,
      updatedAt: tasks.updateAt,
    })
    .from(tasks)
    .leftJoin(
      taskDone,
      and(eq(tasks.id, taskDone.task_id), eq(taskDone.chat_id, chat_id))
    )
    .where(isNull(taskDone.task_id));
  const video = await db
    .select({
      id: videos.id,
      videoId: videos.videoId,
      coins: videos.coins,
      code: videos.code,
      createdAt: videos.createdAt,
      updatedAt: videos.updateAt,
    })
    .from(videos)
    .leftJoin(
      videoDone,
      and(eq(videos.id, videoDone.videoId), eq(videoDone.chatId, chat_id))
    )
    .where(isNull(videoDone.videoId));
  const game = await db.select().from(games).limit(4);
  return Response.json({
    task,
    video,
    game,
  });
}
