import { db } from "@/db";
import { games } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
    const data:{id:number} = await request.json();
    // Add your logic here to save the data to your database. For example:
    await db.delete(games).where(eq(games.id,data.id))
    return NextResponse.json({message:"Success"});
}