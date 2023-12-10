import { Router } from "express";
import IndexController from "@controllers/index.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", IndexController.get);

/* Export router */
export default router;