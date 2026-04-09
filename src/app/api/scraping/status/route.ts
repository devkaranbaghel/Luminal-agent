import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns mock platform scanner status
  return NextResponse.json([
    { id: 'linkedin', name: 'LinkedIn', lastScan: '2 min ago', status: 'Scanning', progress: 60, active: true },
    { id: 'indeed', name: 'Indeed', lastScan: '4 min ago', status: 'Querying API', progress: 40, active: true },
    { id: 'glassdoor', name: 'Glassdoor', lastScan: '12 min ago', status: 'Idle', progress: 0, active: false }
  ]);
}
