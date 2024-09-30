import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  // Validate token and chat_id here. If invalid, return error response.
  const response: {
    token: string;
  } = await request.json();
  return Response.json(response.token);
}

export async function POST(request: NextRequest) {
  const response: {
    id: number;
    username: string;
    name: string;
  } = await request.json();
  var chat_id: number = response.id || 0;
  var refer_id: number = response.id || 0;
  var username: string = response.username || "";
  var name: string = response.name || "";
  // Validate token and chat_id here. If invalid, return error response.
  if (!chat_id) {
    return NextResponse.json({ error: "Invalid response" }, { status: 400 });
  }
  try {
    const usersExist = await db
      .select()
      .from(users)
      .where(eq(users.chatId, chat_id));
    if (usersExist.length > 0) {
      return NextResponse.json({ chat_id: response.id });
    }
    const chat = await db.insert(users).values({
      chatId: chat_id,
      username: username,
      refer: refer_id,
      name: name,
    });
    return NextResponse.json({ chat_id: response.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }

}
