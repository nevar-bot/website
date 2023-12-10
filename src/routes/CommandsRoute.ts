import { Router } from "express";
import CommandsController from "@controllers/commands.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", CommandsController.get);

/* Export router */
export default router;