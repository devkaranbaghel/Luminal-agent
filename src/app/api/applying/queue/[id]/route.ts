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
    const userId = (session.user as unknown).id;

    const application = await prisma.application.upsert({
      where: {
        id: `app_${userId}_${id}`,
      },
      update: { status: "QUEUED" },
      create: {
        id: `app_${userId}_${id}`,
        userId: userId,
        jobId: id,
        status: "QUEUED",
      },
    });

    return NextResponse.json(application);
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
