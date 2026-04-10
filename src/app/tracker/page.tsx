import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { TrackerClient } from '@/components/TrackerClient';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';

export default async function TrackerPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = (session.user as unknown).id;

  // Fetch all applications for the user
  const applications = await prisma.application.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <LeftSidebar activeItem="Tracker" />
      <TrackerClient applications={applications} />
    </div>
  );
}
