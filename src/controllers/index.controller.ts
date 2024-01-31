import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            /* Get bot data from api */
            const botStats: any = (await axios.get("https://api.nevar.eu/general/stats")).data;
            const botVotes: any = (await axios.post("https://api.nevar.eu/votes/stats", { month: new Date().getMonth() + 1 })).data;
            const botStaffs: any = (await axios.get("https://api.nevar.eu/general/staffs")).data;
            const botCommands: any = (await axios.get("https://api.nevar.eu/interactions/commands")).data;

            /* Render index page */
            res.render("index", {
                name: "Nevar",
                title: "Startseite",
                metaData: {
                    description: "Startseite des Nevar Discord-Bots",
                    keywords: "Nevar, Discord, Bot, Home, Start"
                },
                voteCount: botVotes.votes || 0,
                guildCount: botStats.bot.guild_count || 0,
                userCount: botStats.bot.user_count || 0,
                commandCount: botCommands.commands.filter((command: any): boolean => command.category !== "owner" && command.category !== "staff").length || 0,
                staffs: botStaffs.head_staffs.concat(botStaffs.staffs),
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