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
    
    const applications = await prisma.application.findMany({
      where: { userId },
      include: { job: true },
      orderBy: { createdAt: 'desc' },
    });

    const columns = {
      pending: applications.filter(a => a.status === "MATCHED"),
      applied: applications.filter(a => a.status === "APPLIED"),
      response: applications.filter(a => a.status === "RESPONSE"),
      interview: applications.filter(a => a.status === "INTERVIEW"),
    };

    return NextResponse.json(columns);
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
