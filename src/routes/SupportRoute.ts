import { Router } from "express";
import SupportController from "@controllers/support.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", SupportController.get);

/* Export router */
export default router;