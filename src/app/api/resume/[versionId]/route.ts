import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ versionId: string }> }
) {
  const { versionId } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { versionName, content, isMaster } = await req.json();
    
    // Check ownership
    const version = await prisma.resumeVersion.findUnique({
      where: { id: versionId },
      include: { profile: true },
    });

    if (!version || version.profile.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized or not found" }, { status: 403 });
    }

    // If setting as master, unset other masters
    if (isMaster) {
      await prisma.resumeVersion.updateMany({
        where: { profileId: version.profileId, isMaster: true },
        data: { isMaster: false },
      });
    }

    const updatedVersion = await prisma.resumeVersion.update({
      where: { id: versionId },
      data: {
        versionName,
        content,
        isMaster,
      },
    });

    return NextResponse.json(updatedVersion);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
