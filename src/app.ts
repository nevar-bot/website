import "module-alias/register";
import "source-map-support/register";
import express, { Express } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";
import * as toml from "toml";
import fs from "fs";

/* Import routes */
import IndexRoute from "@routes/IndexRoute";
import ContactRoute from "@routes/ContactRoute";
import CommandsRoute from "@routes/CommandsRoute";
import InviteRoute from "@routes/InviteRoute";
import SupportRoute from "@routes/SupportRoute";
import RedirectRoute from "@routes/RedirectRoute";
import VoteRoute from "@routes/VoteRoute";
import ImprintRoute from "@routes/ImprintRoute";
import PrivacyRoute  from "@routes/PrivacyRoute";
import BotPrivacyRoute from "@routes/BotPrivacyRoute";
import TermsRoute from "@routes/TermsRoute";

/* Load config */
const config: any = toml.parse(fs.readFileSync("./config.toml", "utf8"));

/* Create express app */
const app: Express = express();

/* Setup express app */
app.use(compression(), express.json(), express.urlencoded({ extended: true }), cookieParser());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));

/* Register routes */
app.use("/", IndexRoute);
app.use("/contact", ContactRoute);
app.use("/commands", CommandsRoute);
app.use("/invite", InviteRoute);
app.use("/support", SupportRoute);
app.use("/redirect", RedirectRoute);
app.use("/vote", VoteRoute);
app.use("/imprint", ImprintRoute);
app.use("/privacy", PrivacyRoute);
app.use("/bot-privacy", BotPrivacyRoute);
app.use("/terms", TermsRoute);

/* Start server */
app.listen(config.PORT, (): void => {
    console.log("Server is listening on port " + config.PORT);
})