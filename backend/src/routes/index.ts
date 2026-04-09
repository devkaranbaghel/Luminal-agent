import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AutomationController } from "../controllers/automation.controller";
import { IntelController } from "../controllers/intel.controller";
import { authenticate } from "../middleware/auth";

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

// Intelligence & User Data
router.get("/user/profile", authenticate, IntelController.getProfile);
router.get("/notifications", authenticate, IntelController.getNotifications);
router.put("/notifications/:id/read", authenticate, IntelController.markRead);
router.get("/interviews", authenticate, IntelController.getInterviews);
router.get("/agent/status", authenticate, IntelController.getAgentStatus);

export default router;
