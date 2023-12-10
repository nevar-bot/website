import { Router } from "express";
import ContactController from "@controllers/contact.controller";

/* Create router */
const router: Router = Router();

/* Register routes */
router.get("/", ContactController.get);
router.post("/submit", ContactController.post);

/* Export router */
export default router;