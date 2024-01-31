import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            const apiLeaderboard: any = (await axios.post("https://api.nevar.eu/levels/leaderboard",
                { guild_id: req.params.guildId },
                { validateStatus: (status: number): boolean => true }
            )).data;

            console.log(apiLeaderboard);

            if(apiLeaderboard.status !== 200) return res.redirect("/");

            /* Render leaderboard page */
            res.render("leaderboard", {
                name: "Nevar",
                title: "Leaderboard",
                metaData: {
                    description: "Leaderboard des Nevar-Levelsystems",
                    keywords: "Nevar, Discord, Bot, Leaderboard, Levelsystem"
                },
                levelData: apiLeaderboard.leaderboard
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
