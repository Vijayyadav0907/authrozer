import express from "express";
import { register, verifyMail, login, logout,forgotPassword, verifyOtp, resetPassword, getProfile } from "../Controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { registerSchema } from "../validator/userValidator.js";
import { validateRegister } from "../middlewares/register.validate.js";

const router = express.Router();

router.post("/register",validateRegister(registerSchema),register);
router.post("/verify-email",verifyMail);
router.post("/login",login);
router.post("/logout",isAuthenticated,logout);
router.post("/forgot-password",forgotPassword);
router.post("/verify-otp/:email",verifyOtp);
router.post("/reset-password/:email",resetPassword);


router.get("/get-user", isAuthenticated, getProfile)


export default router;
