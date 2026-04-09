import { Request, Response, NextFunction } from "express";
import { AutomationService } from "../services/automation.service";
import { AuthRequest } from "../middleware/auth";

export class AutomationController {
  static async queueApplication(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { title, company } = req.body;
      const app = await AutomationService.startApplication(req.user!.id, { title, company });
      res.status(201).json({ success: true, data: app });
    } catch (error) {
      next(error);
    }
  }

  static async getMatches(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const matches = await AutomationService.getMatches(req.user!.id);
      res.status(200).json({ success: true, data: matches });
    } catch (error) {
      next(error);
    }
  }

  static async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const logs = await AutomationService.getServiceHealth(req.user!.id);
      res.status(200).json({ success: true, data: logs });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status, message } = req.body;
      const app = await AutomationService.updateApplicationStatus(req.params.id, req.user!.id, status, message);
      res.status(200).json({ success: true, data: app });
    } catch (error) {
      next(error);
    }
  }
}
