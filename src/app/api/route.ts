import { taskDone } from './../../db/schema';
import { db } from "@/db";
import { users } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  // Validate token and chat_id here. If invalid, return error response.
  return Response.json("data");
}

export async function POST(request: NextRequest) {
  // const randomRow = await db.select().from(users).orderBy(sql`RANDOM()`).limit(1);
const randomRow = await db.select().from(taskDone)
  return NextResponse.json(randomRow);
}
