import { Router } from "express";
import TermsController from "@controllers/terms.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", TermsController.get);

/* Export router */
export default router;