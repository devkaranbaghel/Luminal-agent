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
    const interviews = await prisma.interview.findMany({
      where: {
        userId: (session.user as unknown).id,
        status: "SCHEDULED"
      },
      include: { questions: true },
      orderBy: { scheduledAt: 'asc' }
    });

    return NextResponse.json(interviews);
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
