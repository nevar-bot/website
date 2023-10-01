import { Request, Response } from "express";

export default {
    get(req: Request, res: Response): void {
        /* redirect to dashboard */
        res.render("index", {
            name: "Nevar",
            title: "Startseite"
        });
    }
};