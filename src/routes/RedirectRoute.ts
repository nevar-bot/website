import { Router } from "express";
import RedirectController from "@controllers/redirect.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/:request", RedirectController.get);

/* Export router */
export default router;