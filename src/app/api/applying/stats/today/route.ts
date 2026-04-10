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
    
    const [submitted, pending, failed] = await Promise.all([
      prisma.application.count({ where: { userId, status: "SUBMITTED" } }),
      prisma.application.count({ where: { userId, status: "QUEUED" } }),
      prisma.application.count({ where: { userId, status: "FAILED" } }),
    ]);

    const total = submitted + failed;
    const successRate = total > 0 ? Math.round((submitted / total) * 100) : 0;

    return NextResponse.json({
      submitted,
      pending,
      failed,
      successRate: `${successRate}%`
    });
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
