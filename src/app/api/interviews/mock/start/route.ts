import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Init mock interview session
  return NextResponse.json({
    sessionId: `mock_${Date.now()}`,
    status: "BOOTING",
    aiVoiceModel: "Stripe-Coach-v1"
  });
}
