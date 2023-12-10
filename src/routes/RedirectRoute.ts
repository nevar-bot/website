import express, { Router } from "express";
const router: Router = express.Router();

import RedirectController from "@controllers/redirect.controller";

router.get("/:request", RedirectController.get);

export default router;