import { Router } from "express";
import VoteController from "@controllers/vote.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", VoteController.get);

/* Export router */
export default router;