import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns mock status distribution data
  return NextResponse.json({
    total: 142,
    distribution: [
      { label: "Applied", percentage: 70 },
      { label: "Interviews", percentage: 15 },
      { label: "Rejected", percentage: 15 }
    ]
  });
}
