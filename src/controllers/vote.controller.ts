import { Request, Response } from "express";

export default {
    async get(req: Request, res: Response): Promise<void> {
        res.status(301).redirect("/redirect/vote")
    }
};
