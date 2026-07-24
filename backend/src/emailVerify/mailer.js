import nodemailer from "nodemailer";
import Config from "../Config/Config.js";

export const createMailer = () => nodemailer.createTransport({
    host: Config.MAIL_HOST,
    port: Config.MAIL_PORT,
    secure: false,
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    auth: {
        user: Config.MAIL,
        pass: Config.MAIL_PASSWORD,
    },
});
