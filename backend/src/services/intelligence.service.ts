import { prisma } from "../config/db";
import { ApiError } from "../middleware/error";

export class IntelligenceService {
  // --- Profiles ---
  static async getProfile(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, location: true, createdAt: true }
    });
  }

  // --- Notifications ---
  static async getNotifications(userId: string) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async markNotificationRead(id: string, userId: string) {
    return await prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true }
    });
  }

  // --- Interviews ---
  static async getInterviews(userId: string) {
    return await prisma.interview.findMany({
      where: { userId },
      orderBy: { date: "asc" }
    });
  }

  static async addInterview(userId: string, data: any) {
    return await prisma.interview.create({
      data: { ...data, userId }
    });
  }

  // --- Agent Controls ---
  static async getAgentStatus(userId: string) {
    // Highly simplified heartbeat
    return {
      active: true,
      lastSync: new Date().toISOString(),
      currentTask: "Scraping tech jobs in SF",
      health: "OPTIMAL"
    };
  }
}
