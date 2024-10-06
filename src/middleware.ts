import { NextResponse } from "next/server";
import { db } from "./db";
import { requests } from "./db/schema";
import { eq } from "drizzle-orm";

export async function middleware(req: Request) {
  const currentDate = new Date();
  const monthYear = `${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`; // Get MM-YYYY

  // Check if the record for the current month already exists
  const existingRecord = await db
    .select()
    .from(requests)
    .where(eq(requests.month, monthYear));

  if (existingRecord.length > 0 && existingRecord[0].request) {
    // If record exists and request is not null, increment the request count
    await db
      .update(requests)
      .set({ request: (existingRecord[0].request ?? 0) + 3 })
      .where(eq(requests.month, monthYear))
  } else {
    // If no record for the current month, insert a new one with request count set to 1
    await db
      .insert(requests)
      .values({
        month: monthYear,
        request: 1,
      })
  }
  return NextResponse.next();
}
export const config = {
  runtime: "experimental-edge", // Use the experimental-edge runtime
};
// Optional: Define which routes the middleware applies to
// export const config = {
//   matcher: ['/api/:path*', '/app/:path*'],
// };
