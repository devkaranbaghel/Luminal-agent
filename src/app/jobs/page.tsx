import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { JobsClient } from '@/components/JobsClient';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';

export default async function JobsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = (session.user as unknown).id;

  // Fetch real ranked jobs from the database
  const scrapedJobs = await prisma.scrapedJob.findMany({
    where: { 
      userId,
      status: 'RANKED'
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <LeftSidebar activeItem="Matching" />
      <JobsClient initialJobs={scrapedJobs} />
    </div>
  );
}
