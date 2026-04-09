import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Generate mock velocity data for the last 30 days (grouped by week or day)
  return NextResponse.json([
    { date: "Oct 01", count: 12 },
    { date: "Oct 08", count: 18 },
    { date: "Oct 15", count: 15 },
    { date: "Oct 22", count: 22 },
    { date: "Today", count: 10 }
  ]);
}
