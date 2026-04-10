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
    const profile = await prisma.profile.findUnique({
      where: { userId: (session.user as unknown).id },
      include: { experience: true },
    });

    return NextResponse.json(profile?.experience || []);
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, company, period, description } = await req.json();
    const profile = await prisma.profile.findUnique({
      where: { userId: (session.user as unknown).id },
    });

    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const experience = await prisma.experience.create({
      data: {
        profileId: profile.id,
        title,
        company,
        period,
        description,
      },
    });

    return NextResponse.json(experience);
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
