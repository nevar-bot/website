import { Router } from "express";
import BotPrivacyController from "@controllers/bot-privacy.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", BotPrivacyController.get);

/* Export router */
export default router;