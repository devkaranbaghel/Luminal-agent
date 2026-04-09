'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function seedDemoData() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !(session.user as any).id) {
    throw new Error("Unauthorized");
  }

  const userId = (session.user as any).id;

  // 1. Seed Scraped Jobs (Matches)
  const jobsToCreate = [
    { title: 'Senior Product Designer', company: 'Google', location: 'Mountain View, CA', matchScore: 98, status: 'RANKED', source: 'LINKEDIN' },
    { title: 'Staff UX Researcher', company: 'Flipkart', location: 'Bangalore, IN', matchScore: 84, status: 'RANKED', source: 'INDEED' },
    { title: 'UX Architect Payments', company: 'Razorpay', location: 'Remote, IN', matchScore: 92, status: 'RANKED', source: 'NAUKRI' },
    { title: 'Principal UX Designer Azure', company: 'Microsoft', location: 'Redmond, WA', matchScore: 78, status: 'RANKED', source: 'LINKEDIN' }
  ];

  for (const j of jobsToCreate) {
    await prisma.scrapedJob.create({
      data: {
        userId,
        title: j.title,
        company: j.company,
        location: j.location,
        matchScore: j.matchScore,
        status: j.status,
        source: j.source
      }
    });
  }

  // 2. Seed Applications (Tracker)
  const appsToCreate = [
    { jobTitle: 'Senior UX Designer', company: 'Linear', status: 'APPLIED' },
    { jobTitle: 'Frontend Lead', company: 'Stripe', status: 'APPLIED' },
    { jobTitle: 'Design Systems Eng', company: 'Figma', status: 'REJECTED' },
    { jobTitle: 'Creative Technologist', company: 'Apple', status: 'INTERVIEW' },
    { jobTitle: 'Product Architect', company: 'Vercel', status: 'APPLIED' },
  ];

  for (const a of appsToCreate) {
    await prisma.application.create({
      data: {
        userId,
        jobTitle: a.jobTitle,
        company: a.company,
        status: a.status,
        appliedDate: new Date(),
      }
    });
  }

  // Seed Notifications
  await prisma.notification.create({
    data: {
      userId,
      title: 'Interview Scheduled',
      message: 'Apple has scheduled a technical interview for Tuesday.',
      type: 'SUCCESS'
    }
  });

  revalidatePath('/jobs');
  revalidatePath('/tracker');
  return { success: true };
}
