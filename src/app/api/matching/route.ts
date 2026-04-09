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
  const minScore = parseInt(searchParams.get("minScore") || "80");
  const sort = searchParams.get("sort") || "compatibility";
  const skills = searchParams.get("skills")?.split(",") || [];

  try {
    const jobs = await prisma.job.findMany({
      where: {
        matchScore: { gte: minScore },
        // Simple skill filtering logic
        ...(skills.length > 0 ? {
          skills: {
            array_contains: skills
          }
        } : {})
      },
      orderBy: sort === "compatibility" ? { matchScore: 'desc' } : { createdAt: 'desc' }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
