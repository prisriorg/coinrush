import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  // Validate token and chat_id here. If invalid, return error response.
  return Response.json({});
}

export async function POST(request: NextRequest) {
  const response: any = await request.json();

  var chat_id: number = response.find((item: any) => item.id)?.id || 0;
  var refer_id: number =
    response.find((item: any) => item.start_param)?.start_param || 0;
  var username: string =
    response.find((item: any) => item.username)?.username || "";
  var name: string =
    response.find((item: any) => item.first_name)?.first_name +
      " " +
      response.find((item: any) => item.last_name)?.last_name || "";
  // Validate token and chat_id here. If invalid, return error response.
  if (!chat_id) {
    return NextResponse.json({ error: "Invalid response" }, { status: 400 });
  }
  // Insert user data to database here. If user already exists, update it.
  console.log(chat_id + " " + refer_id + " " + username + " " + name);
  try {
    const usersExist = await db
      .select()
      .from(users)
      .where(eq(users.chatId, chat_id));
    if (usersExist.length > 0) {
      return NextResponse.json(usersExist[0]);
    }
    const chat = await db.insert(users).values({
      chatId: chat_id,
      username: username,
      refer: refer_id,
      name: name,
    });
    const usersExist2 = await db
      .select()
      .from(users)
      .where(eq(users.chatId, chat_id));
    if (usersExist.length > 0) {
      return NextResponse.json(usersExist2[0]);
    }
    return NextResponse.json("ok");
  } catch (err: any) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
