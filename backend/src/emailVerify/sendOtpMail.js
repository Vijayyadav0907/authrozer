import nodemailer from "nodemailer";
import Config from "../Config/Config.js";

export const sendOtpMail = async(email,otp) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:
         {user: Config.MAIL,
        pass: Config.MAIL_PASSWORD}});
    const mailOptions = {
        from: Config.MAIL,
        to: email,
        subject: "Password reset OTP ",
        html: `<h2>OTP for password reset is ${otp}. it will expire in 10 minutes</h2>`,};
    await transporter.sendMail(mailOptions);
}