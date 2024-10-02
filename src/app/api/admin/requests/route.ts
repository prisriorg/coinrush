import { db } from "@/db";
import { requests } from "@/db/schema";
import { eq, sum } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  const currentDate = new Date();
  const monthYear = `${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;
  const thisMonts = await db
    .select({ request: requests.request })
    .from(requests)
    .where(eq(requests.month, monthYear));
  const total = await db.select().from(requests);
  const totalReq = total.reduce((sum, user) => sum + (user.request || 0), 0);
  return NextResponse.json({
    totalReq: totalReq,
    monthReq: thisMonts[0].request,
    list: total,
  });
}
