import { db } from "@/db";
import { taskDone, tasks, users, videoDone } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  const now = new Date();

  const oneDayAgo = new Date(now);
  oneDayAgo.setDate(now.getDate() - 1);

  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const twentyEightDaysAgo = new Date(now);
  twentyEightDaysAgo.setDate(now.getDate() - 28);

  async function getUserStats() {
    // Users added in the last 24 hours
    const users24Hr = await db
      .select()
      .from(users)
      .where(sql`${users.createdAt} >= ${oneDayAgo.toISOString()}`);

    // Users added in the last 7 days
    const users7Days = await db
      .select()
      .from(users)
      .where(sql`${users.createdAt} >= ${sevenDaysAgo.toISOString()}`);

    // Users added in the last 28 days
    const users28Days = await db
      .select()
      .from(users)
      .where(sql`${users.createdAt} >= ${twentyEightDaysAgo.toISOString()}`);
    // const tasksDone = await db.select().from(taskDone);
    // const videosDone = await db.select().from(videoDone);
    // All-time users
    const allTimeUsers = await db.select().from(users);

    return {
      users24Hr: users24Hr.length,
      users7Days: users7Days.length,
      users28Days: users28Days.length,
      allTimeUsers: allTimeUsers.length,
      // tasksDone: tasksDone.length,
      // videosDone: videosDone.length,
    };
  }
  const data = await getUserStats();
  return NextResponse.json({
    data,
  });
}
