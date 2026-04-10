import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Ownership check
    const job = await prisma.pipelineJob.findUnique({
      where: { id: id }
    });

    if (!job || job.userId !== (session.user as unknown).id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedJob = await prisma.pipelineJob.update({
      where: { id: id },
      data: {
        stage: body.stage,
        status: body.status,
        title: body.title,
        company: body.company,
        matchScore: body.matchScore,
        dateLabel: body.dateLabel,
      }
    });

    return NextResponse.json(updatedJob);
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const job = await prisma.pipelineJob.findUnique({
      where: { id: id }
    });

    if (!job || job.userId !== (session.user as unknown).id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.pipelineJob.delete({
      where: { id: id }
    });

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
