import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Get commands from api */
            const { command_list } = (await axios.get("https://api.nevar.eu/interactions/commands")).data.res;

            /* Render commands page */
            res.render("commands", {
                name: "Nevar",
                title: "Befehle",
                metaData: {
                    description: "Alle Befehle des Nevar Discord-Bots",
                    keywords: "Nevar, Discord, Bot, Commands, Befehle"
                },
                commands: command_list
            });
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
