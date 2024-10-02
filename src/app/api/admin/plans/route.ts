import { db } from "@/db";
import { plans } from "@/db/schema";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  const plan = await db
    .select({
      id: plans.id,
      price: plans.price,
      traffic: plans.requests,
    })
    .from(plans);
  return NextResponse.json({
    data: plan
  });
}
