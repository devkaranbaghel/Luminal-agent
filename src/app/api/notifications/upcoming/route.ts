import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns mock upcoming calendar events
  return NextResponse.json([
    {
      id: 'e1',
      date: 'OCT 12',
      title: 'Flipkart Interview',
      subtitle: 'Round 1: Design Sync',
      timeLabel: 'IN 1D 4H',
      status: 'success'
    },
    {
      id: 'e2',
      date: 'OCT 14',
      title: 'Google Coffee Chat',
      subtitle: 'Networking: Referral',
      timeLabel: 'IN 3D 6H',
      status: 'warning'
    }
  ]);
}
