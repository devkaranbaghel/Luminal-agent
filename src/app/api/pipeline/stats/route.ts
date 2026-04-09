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
    const userId = (session.user as any).id;
    
    const [total, applied, interview, offers] = await Promise.all([
      prisma.pipelineJob.count({ where: { userId } }),
      prisma.pipelineJob.count({ where: { userId, stage: "APPLIED" } }),
      prisma.pipelineJob.count({ where: { userId, stage: "INTERVIEW" } }),
      prisma.pipelineJob.count({ where: { userId, stage: "OFFER" } }),
    ]);

    return NextResponse.json({
      total,
      applied,
      interview,
      offers
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
