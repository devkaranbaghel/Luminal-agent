import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns mock platform performance data
  return NextResponse.json([
    { name: "LinkedIn", percentage: 82, color: "teal" },
    { name: "Indeed", percentage: 45, color: "orange" },
    { name: "Naukri", percentage: 64, color: "orange" },
    { name: "Direct Company", percentage: 94, color: "green" }
  ]);
}
