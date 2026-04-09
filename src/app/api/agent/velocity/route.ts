import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns mock agent velocity data
  return NextResponse.json({
    matchRate: 75,
    appsToday: 24,
    scanningStatus: "Active",
    boardsCount: 42
  });
}
