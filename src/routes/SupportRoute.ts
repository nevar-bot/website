import express, { Router } from "express";
const router: Router = express.Router();

import SupportRoute from "@controllers/support.controller";

router.get("/", SupportRoute.get);

export default router;