import { Request, Response } from "express";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Render bot privacy page */
            res.render("bot-privacy", {
                name: "Nevar",
                title: "Bot-Datenschutzerklärung",
                metaData: {
                    description: "Bot-Datenschutzerklärung gemäß Discord-Developer-Richtlinien",
                    keywords: "Nevar, Discord, Bot, Bot Privacy, Bot Datenschutz"
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
