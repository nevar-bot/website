import { Router } from "express";
import NotfoundController from "@controllers/notfound.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", NotfoundController.get);

/* Export router */
export default router;