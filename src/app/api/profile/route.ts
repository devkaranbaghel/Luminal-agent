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
      include: {
        skills: true,
        experience: true,
      },
    });

    if (!profile) {
      // Create a default profile if it doesn't exist
      const newProfile = await prisma.profile.create({
        data: {
          userId: (session.user as any).id,
          fullName: session.user.name || "",
          email: session.user.email || "",
        },
        include: {
          skills: true,
          experience: true,
        },
      });
      return NextResponse.json(newProfile);
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { fullName, email, headline } = body;

    const updatedProfile = await prisma.profile.update({
      where: { userId: (session.user as any).id },
      data: {
        fullName,
        email,
        headline,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
