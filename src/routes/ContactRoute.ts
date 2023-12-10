import express, { Router } from "express";
const router: Router = express.Router();

import ContactController from "@controllers/contact.controller";

router.get("/", ContactController.get);
router.post("/submit", ContactController.post);

export default router;