import { Response, NextFunction } from "express";
import { IntelligenceService } from "../services/intelligence.service";
import { AuthRequest } from "../middleware/auth";

export class IntelController {
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const profile = await IntelligenceService.getProfile(req.user!.id);
      res.json({ success: true, data: profile });
    } catch (error) {
      next(error);
    }
  }

  static async getNotifications(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const notes = await IntelligenceService.getNotifications(req.user!.id);
      res.json({ success: true, data: notes });
    } catch (error) {
      next(error);
    }
  }

  static async markRead(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await IntelligenceService.markNotificationRead(req.params.id, req.user!.id);
      res.json({ success: true, data: "Marked as read" });
    } catch (error) {
      next(error);
    }
  }

  static async getInterviews(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const interviews = await IntelligenceService.getInterviews(req.user!.id);
      res.json({ success: true, data: interviews });
    } catch (error) {
      next(error);
    }
  }

  static async getAgentStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const status = await IntelligenceService.getAgentStatus(req.user!.id);
      res.json({ success: true, data: status });
    } catch (error) {
      next(error);
    }
  }
}
