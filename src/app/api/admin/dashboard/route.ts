import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {

  
  return NextResponse.json({
    data:{
      users24Hr: 150,
      users7Days: 1200,
      users28Days: 4000,
      allTimeUsers: 15000,
    }
  });
}
