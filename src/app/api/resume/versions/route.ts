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
    });

    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const versions = await prisma.resumeVersion.findMany({
      where: { profileId: profile.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(versions);
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
    const { versionName, content, isMaster } = await req.json();
    const profile = await prisma.profile.findUnique({
      where: { userId: (session.user as unknown).id },
    });

    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    // If setting as master, unset other masters
    if (isMaster) {
      await prisma.resumeVersion.updateMany({
        where: { profileId: profile.id, isMaster: true },
        data: { isMaster: false },
      });
    }

    const newVersion = await prisma.resumeVersion.create({
      data: {
        profileId: profile.id,
        versionName,
        content,
        isMaster,
      },
    });

    return NextResponse.json(newVersion);
  } catch (_error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
