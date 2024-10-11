import { db } from "@/db";
import { games, withdwaral } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  try {
    // const {
    //   page,
    //   pageSize,
    // }: {
    //   page: number;
    //   pageSize: number;
    // } = await request.json();
    const totalUsers = await db
      .select()
      .from(withdwaral).where(eq(withdwaral.status,0));
    return NextResponse.json({
      data: totalUsers,
    });
  } catch (err) {
    return NextResponse.json({
      data: [],
    });
  }
}
