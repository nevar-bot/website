import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Render imprint page */
            res.render("imprint", {
                name: "Nevar",
                title: "Impressum",
                metaData: {
                    description: "Impressum gemäß § 5 TMG",
                    keywords: "Nevar, Discord, Bot, Imprint, Impressum"
                }
            });
        }catch(error){
            /* Render 503 error page */
            res.status(503).render("errors/503", {
                name: "Nevar",
                title: "Fehler 503",
                metaData: {
                    description: "503 Service Unavailable",
                    keywords: "Nevar, Discord, Bot, 503, Service Unavailable"
                }
            });
        }
    }
};
