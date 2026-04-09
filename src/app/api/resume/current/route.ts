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
      where: { userId: (session.user as any).id },
    });

    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const currentResume = await prisma.resumeVersion.findFirst({
      where: { profileId: profile.id, isMaster: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (!currentResume) {
      // Return a default structure if none exists
      return NextResponse.json({
        versionName: "Master",
        content: {
          name: session.user.name,
          email: session.user.email,
          title: "Full Stack Developer",
          summary: "Passionate developer...",
          sections: []
        }
      });
    }

    return NextResponse.json(currentResume);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
