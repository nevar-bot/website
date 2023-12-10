import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Get invite url from api */
            const { invite_url } = (await axios.get("https://api.nevar.eu/client/stats")).data.res;

            /* Redirect to invite url */
            res.status(301).redirect(invite_url);
        }catch(error){
            /* Render 500 error page */
            res.status(500).render("errors/500", {
                name: "Nevar",
                title: "Fehler 500",
                metaData: {
                    description: "500 Internal Server Error",
                    keywords: "Nevar, Discord, Bot, 500, Internal Server Error"
                }
            });
        }
    }
};
