import { Request, Response } from "express";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Render 404 page */
            res.render("errors/404", {
                name: "Nevar",
                title: "Fehler 404",
                metaData: {
                    description: "Die angeforderte Seite wurde nicht gefunden.",
                    keywords: "Nevar, Discord, Bot, Not found, Nicht gefunden, 404"
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
