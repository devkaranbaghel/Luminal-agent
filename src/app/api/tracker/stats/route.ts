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
    
    const [total, pending, response, interview] = await Promise.all([
      prisma.application.count({ where: { userId } }),
      prisma.application.count({ where: { userId, status: "MATCHED" } }), // Pending = Matched but not yet applied? Or specific PENDING status
      prisma.application.count({ where: { userId, status: "RESPONSE" } }),
      prisma.application.count({ where: { userId, status: "INTERVIEW" } }),
    ]);

    return NextResponse.json({
      total,
      pending,
      response,
      interview,
      trends: {
        total: "+12%",
        response: "+5%",
        interview: "+2"
      }
    });
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
