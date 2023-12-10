import express, { Router } from "express";
const router: Router = express.Router();

import CommandsController from "@controllers/commands.controller";

router.get("/", CommandsController.get);

export default router;