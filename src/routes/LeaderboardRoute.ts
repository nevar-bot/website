import { Router } from "express";
import LeaderboardController from "@controllers/leaderboard.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/:guildId", LeaderboardController.get);

/* Export router */
export default router;