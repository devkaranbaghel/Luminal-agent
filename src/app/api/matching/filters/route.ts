import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns mock active filter state
  return NextResponse.json({
    minMatchScore: 80,
    sortBy: "compatibility",
    requiredSkills: ["React", "TypeScript"]
  });
}
