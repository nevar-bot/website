import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Get commands from api */
            const { res } = (await axios.get("https://api.nevar.eu/interactions/commands")).data;

            /* Render commands page */
            res.render("commands", {
                name: "Nevar",
                title: "Befehle",
                metaData: {
                    description: "Alle Befehle des Nevar Discord-Bots",
                    keywords: "Nevar, Discord, Bot, Commands, Befehle"
                },
                commands: res.command_list
            });
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
