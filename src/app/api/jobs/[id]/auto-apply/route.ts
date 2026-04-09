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
    const application = await prisma.application.upsert({
      where: {
        // Need to add a unique constraint in schema for user + job
        id: `app_${(session.user as any).id}_${id}`,
      },
      update: { status: "APPLIED" },
      create: {
        id: `app_${(session.user as any).id}_${id}`,
        userId: (session.user as any).id,
        jobId: id,
        status: "APPLIED",
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
