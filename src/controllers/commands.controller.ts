import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        const clientCommands: any = await axios.get("https://api.nevar.eu/interactions/commands");

        res.render("commands", {
            name: "Nevar",
            title: "Befehle",
            metaData: {
                description: "Nevar Discord-Bot",
                keywords: "Nevar, Discord"
            },
            commands: clientCommands?.data,
        });
    }
};
