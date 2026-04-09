import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns mock weekly application data for the bar chart
  return NextResponse.json([
    { day: "M", count: 8 },
    { day: "T", count: 12 },
    { day: "W", count: 6 },
    { day: "R", count: 15 },
    { day: "F", count: 9 },
  ]);
}
