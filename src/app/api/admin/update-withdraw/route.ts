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
    const { id }: { id: number } = await request.json();
    await db.update(withdwaral).set({
        status:1
    }).where(eq(withdwaral.id,id))
   
    return NextResponse.json({
      ok: true,
    });
  } catch (err) {
    return NextResponse.json({
      err: err,
    });
  }
}
