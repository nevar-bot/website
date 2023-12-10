import { Request, Response } from "express";
import axios from "axios";

export default {
    async get(req: Request, res: Response): Promise<void> {
        const clientStats: any = await axios.get("https://api.nevar.eu/client/stats");
        const invite: any = clientStats?.data.res.invite_url || "https://nevar.eu";
        res.redirect(invite);
    }
};