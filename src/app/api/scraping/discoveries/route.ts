import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "10");

  try {
    // Recent jobs specifically discovered but not yet applied
    const jobs = await prisma.job.findMany({
      where: {
        applications: {
          none: { userId: (session.user as any).id }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
