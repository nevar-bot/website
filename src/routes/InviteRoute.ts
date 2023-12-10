import express, { Router } from "express";
const router: Router = express.Router();

import InviteController from "@controllers/invite.controller";

router.get("/", InviteController.get);

export default router;