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
    const { stage } = await req.json();
    
    // Authorization: Ensure the job belongs to the user or is a valid transition
    // Mapping job ID to application ID if needed, or using application ID directly
    
    const updated = await prisma.application.updateMany({
      where: {
        jobId: id,
        userId: (session.user as any).id,
      },
      data: { status: stage.toUpperCase() },
    });

    return NextResponse.json({ success: true, updatedCount: updated.count });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
