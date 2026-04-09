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
  const minScore = parseInt(searchParams.get("minScore") || "0");
  const platform = searchParams.get("platform");
  const jobType = searchParams.get("jobType");

  try {
    const jobs = await prisma.job.findMany({
      where: {
        matchScore: { gte: minScore },
        ...(platform && platform !== "all" ? { platform } : {}),
      },
      include: {
        applications: {
          where: { userId: (session.user as any).id }
        }
      },
      orderBy: { matchScore: 'desc' }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
