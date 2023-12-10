import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        /* get bot data */
        const clientStats: any = await axios.get("https://api.nevar.eu/client/stats");
        const clientStaffs: any = await axios.get("https://api.nevar.eu/client/staffs");
        const clientCommands: any = await axios.get("https://api.nevar.eu/interactions/commands");

        const guildCount: number = clientStats.data?.res.server_count;
        const userCount: number = clientStats.data?.res.user_count;
        const voteCount: number = clientStats.data?.res.vote_count;
        const commandCount: number = clientCommands.data?.res.command_list.filter((command: any): boolean => command.category !== "owner" && command.category !== "staff").length;
        const staffs: any = clientStaffs.data?.res.staffs;

        /* render index page */
        res.render("index", {
            name: "Nevar",
            title: "Startseite",
            metaData: {
                description: "Nevar Discord-Bot",
                keywords: "Nevar, Discord"
            },
            voteCount: voteCount || 0,
            guildCount: guildCount || 0,
            userCount: userCount || 0,
            commandCount: commandCount || 0,
            staffs: staffs || []
        });
    }
};