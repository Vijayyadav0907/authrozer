import Config from "../Config/Config.js";
import { createMailer } from "./mailer.js";

export const sendOtpMail = async(email,otp) =>{
    const transporter = createMailer();
    const mailOptions = {
        from: Config.MAIL,
        to: email,
        subject: "Password reset OTP ",
        html: `<h2>OTP for password reset is ${otp}. it will expire in 10 minutes</h2>`,};
    await transporter.sendMail(mailOptions);
}
