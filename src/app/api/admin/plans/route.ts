import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  return NextResponse.json({data:[
    {
      id: 1,
      name: "Basic Plan",
      price: 9,
      traffic: "10k/month",
    },
    {
      id: 2,
      name: "Standard Plan",
      price: 17,
      traffic: "50k/month",
    },
    {
      id: 3,
      name: "Premium Plan",
      price: 50,
      traffic: "Unlimited",
    },
  ]});
}
