import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AutomationController } from "../controllers/automation.controller";
import { IntelController } from "../controllers/intel.controller";
import { authenticate, AuthRequest } from "../middleware/auth";
import { JobsService } from "../services/jobs.service";
import { prisma } from "../config/db";

const router = Router();

// Auth
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/auth/refresh", AuthController.refresh);
router.post("/auth/logout", AuthController.logout);

// Automation Loop
router.get("/automation/matches", authenticate, AutomationController.getMatches);
router.post("/automation/apply", authenticate, AutomationController.queueApplication);
router.put("/automation/status/:id", authenticate, AutomationController.updateStatus);
router.get("/automation/dashboard", authenticate, AutomationController.getDashboard);
router.post("/automation/simulate", async (req, res) => {
  try {
    // For easy testing: find the first user in the DB (or pass a userId in body)
    const user = await prisma.user.findFirst();
    if (!user) return res.status(400).json({ error: "No users exist to simulate a job for!" });

    const job = await JobsService.simulateIncomingJob(user.id);
    res.status(200).json({ success: true, data: job });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Intelligence & User Data
router.get("/user/profile", authenticate, IntelController.getProfile);
router.get("/notifications", authenticate, IntelController.getNotifications);
router.put("/notifications/:id/read", authenticate, IntelController.markRead);
router.get("/interviews", authenticate, IntelController.getInterviews);
router.get("/agent/status", authenticate, IntelController.getAgentStatus);

export default router;
