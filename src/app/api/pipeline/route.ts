import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const jobs = await prisma.pipelineJob.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { updatedAt: 'desc' }
    });

    const stages = {
      discovered: jobs.filter(j => j.stage === "DISCOVERED"),
      applied: jobs.filter(j => j.stage === "APPLIED"),
      screening: jobs.filter(j => j.stage === "SCREENING"),
      interview: jobs.filter(j => j.stage === "INTERVIEW"),
    };

    return NextResponse.json(stages);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, company, stage, status, matchScore, dateLabel } = await req.json();
    
    const newJob = await prisma.pipelineJob.create({
      data: {
        userId: (session.user as any).id,
        title,
        company,
        stage: stage || "DISCOVERED",
        status,
        matchScore,
        dateLabel: dateLabel || "Today",
      }
    });

    return NextResponse.json(newJob);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
