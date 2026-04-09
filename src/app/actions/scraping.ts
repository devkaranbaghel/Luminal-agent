'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateScrapingFilters(formData: {
  keywords: string;
  location: string;
  jobTypes: string;
  minSalary: number;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !(session.user as any).id) {
    throw new Error("Unauthorized");
  }

  const userId = (session.user as any).id;

  await prisma.scrapingFilter.upsert({
    where: { userId },
    update: {
      keywords: formData.keywords,
      location: formData.location,
      jobTypes: formData.jobTypes,
      minSalary: formData.minSalary,
    },
    create: {
      userId,
      keywords: formData.keywords,
      location: formData.location,
      jobTypes: formData.jobTypes,
      minSalary: formData.minSalary,
    }
  });

  revalidatePath('/scraping');
  return { success: true };
}
