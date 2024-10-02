import { db } from "@/db";
import { setting } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  const data: { email: string; password: string } = await request.json();
  const username = await db
    .select({ admin: setting.admin, pass: setting.password })
    .from(setting)
    .where(eq(setting.id, 1));
  if (
    username.length > 0 &&
    username[0].admin === data.email &&
    username[0].pass === data.password
  ) {
    return NextResponse.json({ success: data.email + data.password });
  } else {
    return NextResponse.json({
      error: "something went wrong",
    });
  }
}
