import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Get support url from api */
            const { support_url } = (await axios.get("https://api.nevar.eu/client/stats")).data.res;

            /* Redirect to support url */
            res.status(301).redirect(support_url);
        }catch(error){
            /* Render 503 error page */
            res.status(503).render("errors/503", {
                name: "Nevar",
                title: "Fehler 503",
                metaData: {
                    description: "500 Service Unavailable",
                    keywords: "Nevar, Discord, Bot, 503, Service Unavailable"
                }
            });
        }
    }
};
