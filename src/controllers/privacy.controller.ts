import { Request, Response } from "express";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Render privacy page */
            res.render("privacy", {
                name: "Nevar",
                title: "Datenschutzerklärung",
                metaData: {
                    description: "Datenschutzerklärung gemäß DSGVO",
                    keywords: "Nevar, Discord, Bot, Privacy, Datenschutz, DSGVO"
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
