import { prisma } from "../config/db";
import { ApiError } from "../middleware/error";

export class AutomationService {
  // --- Scraped Jobs ---
  static async addScrapedJob(userId: string, data: any) {
    return await prisma.scrapedJob.create({
      data: { ...data, userId },
    });
  }

  static async getMatches(userId: string) {
    return await prisma.scrapedJob.findMany({
      where: { userId, status: "RANKED" },
      orderBy: { createdAt: "desc" },
    });
  }

  // --- Applications ---
  static async startApplication(userId: string, jobData: { title: string; company: string }) {
    const app = await prisma.application.create({
      data: {
        jobTitle: jobData.title,
        company: jobData.company,
        status: "QUEUED",
        userId,
      },
    });

    // Initial Log
    await this.addLog(app.id, "INFO", `Application queued for ${jobData.title} at ${jobData.company}`);
    
    return app;
  }

  static async updateApplicationStatus(id: string, userId: string, status: string, logMessage?: string) {
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app || app.userId !== userId) throw new ApiError(404, "Application not found");

    const updated = await prisma.application.update({
      where: { id },
      data: { status, appliedDate: status === "COMPLETED" ? new Date() : undefined },
    });

    if (logMessage) {
      await this.addLog(id, status === "FAILED" ? "ERROR" : "SUCCESS", logMessage);
    }

    return updated;
  }

  // --- Logs ---
  static async addLog(applicationId: string, level: string, message: string) {
    return await prisma.agentLog.create({
      data: { applicationId, level, message },
    });
  }

  static async getServiceHealth(userId: string) {
     const recentLogs = await prisma.agentLog.findMany({
       take: 10,
       orderBy: { createdAt: "desc" },
       include: { application: true }
     });
     return recentLogs;
  }
}
