import "module-alias/register";
import "source-map-support/register";
import express, { Express } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";
import * as toml from "toml";
import fs from "fs";

import IndexRoute from "@routes/IndexRoute";

const config: any = toml.parse(fs.readFileSync("./config.toml", "utf8"));

const app: Express = express();

app.use(compression(), express.json(), express.urlencoded({ extended: true }), cookieParser());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/", IndexRoute);
app.listen(config.PORT, (): void => {
    console.log("Server is running on port " + config.PORT);
})