import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Get bot data from api */
            const stats: any = (await axios.get("https://api.nevar.eu/client/stats")).data.res;
            const staffs: any = (await axios.get("https://api.nevar.eu/client/staffs")).data.res.staffs;
            const commands: any = (await axios.get("https://api.nevar.eu/interactions/commands")).data.res.command_list;

            /* Render index page */
            res.render("index", {
                name: "Nevar",
                title: "Startseite",
                metaData: {
                    description: "Startseite des Nevar Discord-Bots",
                    keywords: "Nevar, Discord, Bot, Home, Start"
                },
                voteCount: stats.vote_count || 0,
                guildCount: stats.server_count || 0,
                userCount: stats.user_count || 0,
                commandCount: commands.filter((command: any): boolean => command.category !== "owner" && command.category !== "staff").length || 0,
                staffs: staffs || []
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