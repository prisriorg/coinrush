import { db } from "@/db";
import { tasks } from "@/db/schema";
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
    // const offset = (page - 1) * pageSize;
    const totalUsers = await db.select().from(tasks);
    return NextResponse.json({
      data: totalUsers,
    });
  } catch (err) {
    return NextResponse.json({
      data: [],
    });
  }
}
