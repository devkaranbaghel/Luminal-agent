import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns mock ATS analysis data as per the design
  return NextResponse.json({
    score: 87,
    metrics: {
      role: 92,
      format: 100,
      read: 74
    },
    keywords: {
      detected: ["React", "Node.js", "CI/CD"],
      missing: ["Docker", "Kubernetes"]
    },
    recommendations: [
      {
        priority: "HIGH",
        title: "Strengthen Action Verbs",
        description: "Change 'Helped build' to 'Architected' or 'Spearheaded' to demonstrate leadership."
      },
      {
        priority: "MEDIUM",
        title: "Quantify Achievements",
        description: "Include specific percentages or metrics for your role at DataFlow Inc."
      }
    ]
  });
}
