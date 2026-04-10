import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { ScrapingClient } from '@/components/ScrapingClient';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';

export default async function ScrapingPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = (session.user as unknown).id;

  // 1. Fetch Scraping Filter
  const filter = await prisma.scrapingFilter.findUnique({
    where: { userId }
  });

  // 2. Fetch Scraper Logs
  const logs = await prisma.scraperLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  // 3. Fetch Recent Discoveries (RANKED jobs)
  const discoveries = await prisma.scrapedJob.findMany({
    where: { userId, status: 'RANKED' },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <LeftSidebar activeItem="Scraping" />
      <ScrapingClient 
        initialFilter={filter} 
        logs={logs} 
        discoveries={discoveries} 
      />
    </div>
  );
}
