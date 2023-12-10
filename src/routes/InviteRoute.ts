import { Router } from "express";
import InviteController from "@controllers/invite.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", InviteController.get);

/* Export router */
export default router;