import { Request, Response } from "express";
import toml from "toml";
import fs from "fs";

export default {
    async get(req: Request, res: Response): Promise<void> {
        const redirects: any = toml.parse(fs.readFileSync("./redirects.toml", "utf8"));
        const redirect_request: string = req.params.request.toLowerCase();

        if(!redirects[redirect_request]) return res.redirect("/");

        res.redirect(redirects[redirect_request]);
    }
};
