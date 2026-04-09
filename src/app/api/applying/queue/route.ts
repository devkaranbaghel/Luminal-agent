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
    const applications = await prisma.application.findMany({
      where: {
        userId: (session.user as any).id,
        status: { in: ["QUEUED", "SUBMITTING", "SUBMITTED", "FAILED"] }
      },
      include: { job: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await prisma.application.deleteMany({
      where: {
        userId: (session.user as any).id,
        status: "QUEUED"
      }
    });

    return NextResponse.json({ success: true, count: deleted.count });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
