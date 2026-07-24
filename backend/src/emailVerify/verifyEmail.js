import hbs from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import Config from "../Config/Config.js";
import { createMailer } from "./mailer.js";

console.log(Config.CLIENT_URL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const VerifyMail = async (token, email, username) => {
    try {
        const transporter = createMailer();

        // Configure Handlebars
        transporter.use(
            "compile",
            hbs({
                viewEngine: {
                    extname: ".hbs",
                    partialsDir: path.resolve(__dirname),
                    defaultLayout: false,
                },
                viewPath: path.resolve(__dirname),
                extName: ".hbs",
            })
        );

        // Create verification link
        const verificationLink = `${Config.CLIENT_URL}/verify-email?token=${token}`;

        // Send email
        await transporter.sendMail({
            from: Config.MAIL,
            to: email,
            subject: "Verify Your Email",
            template: "template",
            context: {
                username,
                verificationLink,
                year: new Date().getFullYear(),
            },
        });

        console.log("✅ Verification email sent successfully.");
    } catch (error) {
        console.error("❌ Error sending verification email:", error);
    }
};
