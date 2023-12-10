import { Request, Response } from "express";
import toml from "toml";
import fs from "fs";

export default {
    async get(req: Request, res: Response): Promise<void> {
        /* Load available redirects */
        const redirects: any = toml.parse(fs.readFileSync("./redirects.toml", "utf8"));

        /* Get requested redirect */
        const redirect_request: string = req.params.request.toLowerCase();

        /* Check if requested redirect exists, if not redirect to home page */
        if(!redirects[redirect_request]) return res.redirect("/");

        /* Redirect to requested redirect */
        res.redirect(redirects[redirect_request]);
    }
};
