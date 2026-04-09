import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = (session.user as any).id;
    
    // Check if job exists
    const job = await prisma.job.findUnique({ where: { id: id } });
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    const application = await prisma.application.upsert({
      where: {
        id: `app_${userId}_${id}`,
      },
      update: { status: "APPLIED" },
      create: {
        id: `app_${userId}_${id}`,
        userId: userId,
        jobId: id,
        status: "APPLIED",
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
