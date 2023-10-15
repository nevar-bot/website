import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        /* get bot data */
        const clientStats: any = await axios.get("https://api.nevar.eu/client/stats");
        const guildCount: number = clientStats.data?.res.server_count;
        const userCount: number = clientStats.data?.res.user_count;
        const voteCount: number = clientStats.data?.res.vote_count;
        const commandCount: number = clientStats.data?.res.command_count;
        console.log(clientStats);
        /* redirect to dashboard */
        res.render("index", {
            name: "Nevar",
            title: "Startseite",
            voteCount: voteCount || 0,
            guildCount: guildCount || 0,
            userCount: userCount || 0,
            commandCount: commandCount || 0
        });
    }
};