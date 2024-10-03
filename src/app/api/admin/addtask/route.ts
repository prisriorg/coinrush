import { db } from "@/db";
import { tasks } from "@/db/schema";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  try {
    const data: {
      taskPlatform: string;
      taskName: string;
      taskCoin: number;
      taskLink: string;
    } = await request.json();
    if (
      !data.taskPlatform ||
      !data.taskName ||
      !data.taskCoin ||
      !data.taskLink
    ) {
      return NextResponse.json({ error: "Missing required fields" });
    }
    const aaaa= await db.insert(tasks).values({
      platform: data.taskPlatform,
      name: data.taskName,
      coins: data.taskCoin,
      link: data.taskLink,
    });
    return NextResponse.json({ message: "Task added successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
