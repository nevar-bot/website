import { Router } from "express";
import ImprintController from "@controllers/imprint.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", ImprintController.get);

/* Export router */
export default router;