import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Returns current agent pipeline status
  return NextResponse.json({
    status: "active",
    version: "2.4.0-STABLE",
    pipeline: [
      { id: "profile", label: "Profile Agent", status: "completed" },
      { id: "resume", label: "Resume Agent", status: "completed" },
      { id: "jobfinder", label: "Job Finder", status: "active", progress: 65 },
      { id: "autoapply", label: "Auto Apply", status: "waiting" },
      { id: "notification", label: "Notification Agent", status: "waiting" }
    ],
    weeklyVolume: 142
  });
}
