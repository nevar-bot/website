import { Request, Response } from "express";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Render terms page */
            res.render("terms", {
                name: "Nevar",
                title: "Nutzungsbedingungen",
                metaData: {
                    description: "Nutzungsbedingungen für die Nutzung von Nevar",
                    keywords: "Nevar, Discord, Bot, Terms, Nutzungsbedingungen"
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
