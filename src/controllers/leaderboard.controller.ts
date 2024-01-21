import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            const apiResponse: any = await axios.get("http://localhost:8075/levels/leaderboard/" + req.params.guildId + "/all", {
                validateStatus: () => true
            });

            if(apiResponse.status !== 200) return res.redirect("/");
            /* Render terms page */
            res.render("leaderboard", {
                name: "Nevar",
                title: "Leaderboard",
                metaData: {
                    description: "Leaderboard des Nevar-Levelsystems",
                    keywords: "Nevar, Discord, Bot, Leaderboard, Levelsystem"
                },
                levelData: apiResponse.data.res
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
