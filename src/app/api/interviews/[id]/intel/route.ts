import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Aggregate mock intel data for a company
  return NextResponse.json({
    company: id,
    description: "Financial infrastructure for the internet. Stripe's software and APIs are used by millions of businesses.",
    techStack: ["React", "Go", "Ruby", "AWS", "Kafka"],
    process: [
      { step: "01", label: "Recruiter Screen", time: "30m" },
      { step: "02", label: "Technical Phone Interview", time: "1h" },
      { step: "03", label: "Virtual Onsite", time: "4-5 rounds" }
    ],
    news: [
      { title: "Stripe expands presence in EU...", source: "TechCrunch", date: "2 days ago" },
      { title: "New checkout automation powered by LLMs...", source: "Company Blog", date: "1 week ago" }
    ]
  });
}
