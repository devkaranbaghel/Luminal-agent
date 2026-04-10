'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveProfile(formData: {
  fullName: string;
  email: string;
  headline: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills: string[];
  experience: unknown[];
  education: unknown[];
  projects: unknown[];
}) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !(session.user as unknown).id) {
    throw new Error("Unauthorized");
  }

  const userId = (session.user as unknown).id;

  // Sync basic user info too
  await prisma.user.update({
    where: { id: userId },
    data: { name: formData.fullName, email: formData.email }
  });

  // Wipe linked data for clean overwrite
  await prisma.$transaction([
    prisma.skill.deleteMany({ where: { profile: { userId } } }),
    prisma.experience.deleteMany({ where: { profile: { userId } } }),
    prisma.education.deleteMany({ where: { profile: { userId } } }),
    prisma.project.deleteMany({ where: { profile: { userId } } }),
  ]);

  const profile = await prisma.profile.upsert({
    where: { userId },
    update: {
      fullName: formData.fullName,
      headline: formData.headline,
      email: formData.email,
      githubUrl: formData.githubUrl,
      portfolioUrl: formData.portfolioUrl,
      skills: { create: formData.skills.map(s => ({ name: s })) },
      experience: { create: formData.experience.map(e => ({ title: e.title, company: e.company, period: e.period, description: e.description })) },
      education: { create: formData.education.map(e => ({ school: e.school, degree: e.degree, period: e.period })) },
      projects: { create: formData.projects.map(p => ({ name: p.name, link: p.link, description: p.description })) },
    },
    create: {
      userId,
      fullName: formData.fullName,
      headline: formData.headline,
      email: formData.email,
      githubUrl: formData.githubUrl,
      portfolioUrl: formData.portfolioUrl,
      skills: { create: formData.skills.map(s => ({ name: s })) },
      experience: { create: formData.experience.map(e => ({ title: e.title, company: e.company, period: e.period, description: e.description })) },
      education: { create: formData.education.map(e => ({ school: e.school, degree: e.degree, period: e.period })) },
      projects: { create: formData.projects.map(p => ({ name: p.name, link: p.link, description: p.description })) },
    }
  });

  revalidatePath('/');
  return { success: true, profile };
}
