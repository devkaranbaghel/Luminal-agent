import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ResumeView from "@/components/ResumeView";

export default async function ResumePage() {
  const session = await getServerSession(authOptions);

  let userData = null;
  
  if (session && session.user && session.user.email) {
    userData = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: {
          include: {
            skills: true,
            experience: true,
            education: true,
            projects: true,
            certificates: true,
          }
        }
      }
    });
  }

  return (
    <>
      <ResumeView userData={userData} />
    </>
  );
}
