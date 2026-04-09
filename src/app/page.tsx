import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { ProfileForm } from '@/components/ProfileForm';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = (session.user as any).id;
  const userEmail = session.user.email || '';

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      skills: true,
      experience: true,
      education: true,
      projects: true,
      certificates: true,
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <LeftSidebar />
      <RightSidebar />

      <main className="pl-[220px] pr-[320px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1000px] mx-auto p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-10 border-l-4 border-accent-primary pl-4">
            <div>
              <h1 className="text-28px font-bold text-text-primary">Candidate Profile</h1>
              <p className="text-text-muted mt-1">Define your professional identity for the autonomous agent.</p>
            </div>
          </div>

          <ProfileForm initialProfile={profile} userEmail={userEmail} />

        </div>
      </main>
    </div>
  );
}
