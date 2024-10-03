import { db } from "@/db";
import { videos } from "@/db/schema";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  try {
    const data: {
      videoCode: number;
      videoCoin: number;
      videoLink: string;
    } = await request.json();
    if (
      !data.videoCode ||
      !data.videoCoin ||
      !data.videoLink
    ) {
      return NextResponse.json({ error: "Missing required fields" });
    }
    const aaaa= await db.insert(videos).values({
      code: data.videoCode,
      coins: data.videoCoin,
      videoId: data.videoLink,
    });
    return NextResponse.json({ message: "Video added successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
