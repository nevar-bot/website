import { Router } from "express";
import PrivacyController from "@controllers/privacy.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", PrivacyController.get);

/* Export router */
export default router;