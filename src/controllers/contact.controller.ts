import { Request, Response } from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import * as toml from "toml";

export default {
    async get(req: Request, res: Response): Promise<void> {
        res.render("contact", {
            name: "Nevar",
            title: "Kontakt",
            metaData: {
                description: "Nevar Discord-Bot",
                keywords: "Nevar, Discord"
            }
        });
    },

    async post(req: Request, res: Response): Promise<any> {
        try {
            const config: any = toml.parse(fs.readFileSync("./config.toml", "utf8"));
            const requestData: any = req.body;

            const requiredFields: string[] = ["email", "subject", "message"];
            if (!requiredFields.every(field => requestData[field])) {
                throw new Error("Bitte fülle alle Felder, welche mit einem * markiert sind, aus.");
            }

            if (requestData.captcha !== "") {
                throw new Error("Du wurdest als Bot erkannt.");
            }

            const transporter: nodemailer.transporter = nodemailer.createTransport({
                host: config.MAIL_HOST,
                port: 465,
                secure: true,
                auth: { user: config.MAIL_LOGIN, pass: config.MAIL_PASSWORD }
            });

            const confirmationHtmlBody: string = fs.readFileSync("./public/html/contact-confirmation.html", "utf8")
                .replace("{{name}}", requestData.name ? (", " + requestData.name) : "");

            const confirmationEmail = await transporter.sendMail({
                from: '"Nevar 〣 No-Reply" <noreply@nevar.eu>',
                to: requestData.email,
                subject: "Deine Anfrage ist eingegangen: " + requestData.subject,
                html: confirmationHtmlBody
            });

            if (confirmationEmail.rejected.length > 0) {
                throw new Error("Die Bestätigungsmail konnte nicht versendet werden. Bitte überprüfe deine E-Mail-Adresse.");
            }

            const supportHtmlBody: string = fs.readFileSync("./public/html/contact-support.html", "utf8")
                .replace("{{name}}", requestData.name || "Unbekannt")
                .replace("{{email}}", requestData.email)
                .replace("{{subject}}", requestData.subject)
                .replace("{{message}}", requestData.message.replace(/\n/g, '<br>'))
                .replace("{{date}}", new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString('de-DE'));

            const supportEmail = await transporter.sendMail({
                from: '"Nevar 〣 No-Reply" <noreply@nevar.eu>',
                to: "hello@nevar.eu",
                subject: "Anfrage über Kontaktformular",
                html: supportHtmlBody
            });

            if (supportEmail.rejected.length > 0) {
                throw new Error("Deine Anfrage konnte nicht versendet werden. Bitte versuche es später erneut.");
            }

            res.status(200).json({
                message: "Deine Anfrage ist bei uns eingegangen. Wir werden uns so schnell wie möglich bei dir melden. Du hast ebenso eine Bestätigung per E-Mail erhalten, schaue bitte auch in deinen Spam-Ordner."
            });

        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
};
