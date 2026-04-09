import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name } = await req.json();
    const profile = await prisma.profile.findUnique({
      where: { userId: (session.user as any).id },
    });

    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const skill = await prisma.skill.create({
      data: {
        profileId: profile.id,
        name,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
