import { Request, Response } from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import * as toml from "toml";

export default {
    async get(req: Request, res: Response): Promise<void> {
        /* Render contact page */
        res.render("contact", {
            name: "Nevar",
            title: "Kontakt",
            metaData: {
                description: "Kontaktiere uns über das Kontaktformular",
                keywords: "Nevar, Discord, Bot, Contact, Kontakt"
            }
        });
    },

    async post(req: Request, res: Response): Promise<any> {
        /* Handle contact form request */
        try {
            /* Load config */
            const config: any = toml.parse(fs.readFileSync("./config.toml", "utf8"));

            /* Get request data */
            const requestData: any = req.body;

            /* Validate request data */
            const requiredFields: string[] = ["email", "subject", "message"];
            if (!requiredFields.every(field => requestData[field])) {
                throw new Error("Bitte fülle alle Felder, welche mit einem * markiert sind, aus.");
            }

            if (requestData.captcha !== "") {
                throw new Error("Du wurdest als Bot erkannt.");
            }

            /* Setup mail transporter */
            const transporter: nodemailer.transporter = nodemailer.createTransport({
                host: config.MAIL_HOST,
                port: 465,
                secure: true,
                auth: { user: config.MAIL_LOGIN, pass: config.MAIL_PASSWORD }
            });

            /* Send confirmation email to user */
            const confirmationHtmlBody: string = fs.readFileSync("./public/html/contact-confirmation.html", "utf8")
                .replace("{{name}}", requestData.name ? (", " + requestData.name) : "");

            const confirmationEmail = await transporter.sendMail({
                from: '"' + config.MAIL_NAME + '" <' + config.MAIL_LOGIN + '>',
                to: requestData.email,
                subject: "Deine Anfrage ist eingegangen: " + requestData.subject,
                html: confirmationHtmlBody
            });

            /* Check if confirmation email was sent */
            if (confirmationEmail.rejected.length > 0) {
                throw new Error("Die Bestätigungsmail konnte nicht versendet werden. Bitte überprüfe deine E-Mail-Adresse.");
            }

            /* Send support email to support */
            const supportHtmlBody: string = fs.readFileSync("./public/html/contact-support.html", "utf8")
                .replace("{{name}}", requestData.name || "Unbekannt")
                .replace("{{email}}", requestData.email)
                .replace("{{subject}}", requestData.subject)
                .replace("{{message}}", requestData.message.replace(/\n/g, '<br>'))
                .replace("{{date}}", new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString('de-DE'));

            const supportEmail = await transporter.sendMail({
                from: '"' + config.MAIL_NAME + '" <' + config.MAIL_LOGIN + '>',
                to: config.SUPPORT_MAIL,
                subject: "Anfrage über Kontaktformular",
                html: supportHtmlBody
            });

            /* Check if support email was sent */
            if (supportEmail.rejected.length > 0) {
                throw new Error("Deine Anfrage konnte nicht versendet werden. Bitte versuche es später erneut.");
            }

            /* Send response */
            res.status(200).json({
                message: "Deine Anfrage ist bei uns eingegangen. Wir werden uns so schnell wie möglich bei dir melden. Du hast ebenso eine Bestätigung per E-Mail erhalten, schaue bitte auch in deinen Spam-Ordner."
            });
        } catch (error: any) {
            /* Send response */
            res.status(400).json({ message: error.message });
        }
    }
};