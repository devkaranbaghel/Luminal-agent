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
    const userId = (session.user as unknown).id;
    
    const [totalMatches, applied, saved, interviews] = await Promise.all([
      prisma.job.count(),
      prisma.application.count({ where: { userId, status: "APPLIED" } }),
      prisma.application.count({ where: { userId, status: "SAVED" } }),
      prisma.application.count({ where: { userId, status: "INTERVIEW" } }),
    ]);

    return NextResponse.json({
      totalMatches,
      applied,
      saved,
      interviews
    });
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
