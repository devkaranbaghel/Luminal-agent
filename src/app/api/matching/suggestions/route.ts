import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns mock AI skill gap suggestions
  return NextResponse.json({
    suggestions: [
      {
        id: 's1',
        type: 'SKILL_UPGRADE',
        targetSkill: 'GraphQL',
        impact: 12,
        message: "Updating your 'GraphQL' proficiency could unlock 12 new 90%+ matches."
      },
      {
        id: 's2',
        type: 'CERTIFICATION',
        targetSkill: 'AWS Cloud Practitioner',
        impact: 8,
        message: "Adding AWS certification would make you eligible for 8 more Senior Infrastructure roles."
      }
    ]
  });
}
