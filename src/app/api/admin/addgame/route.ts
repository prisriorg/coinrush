import { db } from "@/db";
import { games } from "@/db/schema";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  try {
    const data: {
      gamesIamge: string;
      gameName: string;
      gameLink: string;
    } = await request.json();
    if (
      !data.gamesIamge ||
      !data.gameName ||
      !data.gameLink
    ) {
      return NextResponse.json({ error: "Missing required fields" });
    }
    const aaaa= await db.insert(games).values({
      gameName: data.gameName,
      gameImage: data.gamesIamge,
      gameUrl: data.gameLink,
      coins: 0,
      code: 0,
    });
    return NextResponse.json({ message: "Game added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
