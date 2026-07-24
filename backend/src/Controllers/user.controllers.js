
import {User} from "../Models/User.model.js";
import {Session} from "../Models/Session.model.js";
import Config from "../Config/Config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { VerifyMail } from "../emailVerify/verifyEmail.js";
import { sendOtpMail } from "../emailVerify/sendOtpMail.js";

export const register = async (req, res) => {
    try {

        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({ success: false,message: "User already exists"});
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password: hashPassword
        })

        const token = jwt.sign({id:user._id}, Config.JWT_SECRET, {expiresIn: "1d"});
        // Do not make registration wait for SMTP. Email failures are logged
        // by VerifyMail while the user receives an immediate response.
        void VerifyMail(token, email, username);

        res.status(201).json(

            {
                success: true,
                 message:"User registered successfully",
                 user,
                 token
            },
            
            )

    }
    catch(error){

        res.status(500).json({message: error.message});

    }
}



export const verifyMail = async(req, res) =>{
    try{

        const authToken = req.headers.authorization

        if(!authToken || !authToken.startsWith("Bearer ")){
            return res.status(400).json({message: "Invalid token"});
        }

        const token = authToken.split(" ")[1];

        let decode;
        try{

            decode = jwt.verify(token, Config.JWT_SECRET);

            if(!decode){
                return res.status(400).json({message: "Invalid token"});
            }

            const user = await User.findById(decode.id);

            if(!user){
                return res.status(400).json({message: "User not found"});
            }

            if(user.isverified){
                return res.status(400).json({message: "User already verified"});
            }

            user.isverified = true;
            await user.save();

            res.status(200).json({message: "User verified successfully",
            user
            });

        }catch(err){
          if(err === "JsonWebTokenError"){
            return res.status(400).json({message: "Invalid token"});
          }

          if(err === "TokenExpiredError"){
            return res.status(400).json({message: "Token expired"});
          }

          return res.status(400).json({message: "Invalid token"});

        }

    }
        catch(error){

            res.status(500).json({message: error.message});

        }
  
}




export const login = async (req,res)=>{
   

    try{

         const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        if(user.isverified === false){
            return res.status(400).json({message: "verify your email first"});

        }

        const isExistingSession = await Session.findOne({userId: user._id});

        if(isExistingSession){
           await Session.deleteOne({userId: user._id});
        }

        await Session.create({userId: user._id});

        const accessToken = jwt.sign({id:user._id}, Config.JWT_SECRET, {expiresIn: "1d"});
        const refreshToken = jwt.sign({id:user._id}, Config.JWT_SECRET, {expiresIn: "7d"});

        user.isLogin = true;
        await user.save();

        res.status(200).json({message: "User logged in successfully",
           
            success: true,
            message:`Welcome back ${user.username}`,
        accessToken,
        refreshToken,
        user
        });
             
    }catch(error){

        res.status(500).json({message: error.message});

    }
}


export const logout = async(req,res)=>{
    try {
        const userId = req.userId;
        await Session.deleteMany({userId});
        await User.findByIdAndUpdate(userId, {isLogin: false});
        res.status(200).json({success: true, message: "User logged out successfully"});    
        
    } catch (error) {
        
    }
}


export const forgotPassword = async(req, res) =>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success:false, message: "User not found"});
        }

       const otp = Math.floor(100000 + Math.random() * 900000).toString(); 

       const otp_expiry = new Date(Date.now() + 5 * 60 * 1000);
       user.otp = otp;
       user.otp_expiry = otp_expiry;
       await user.save();
       await sendOtpMail(email, otp);

       res.status(200).json({success:true, message: "Otp sent successfully"});
    } catch (error) {
        return res.status(500).json({success:false, message: error.message});
        
    }
}


export const verifyOtp = async(req, res) =>{
    try {
        const otp = req.body;
        console.log(otp);
        const email = req.params.email;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success:false, message: "User not found"});
        }

        if(user.otp !== otp.otp){
            return res.status(400).json({success:false, message: "Invalid otp"});
        }

        if(user.otp_expiry < Date.now()){
            return res.status(400).json({success:false, message: "Otp expired, Please regenerate otp"});
        }

        res.status(200).json({success:true, message: "Otp verified successfully"});
        user.otp = null;
        user.otp_expiry = null;
        await user.save();

        
    } catch (error) {
        return res.status(500).json({success:false, message: error.message});
        
    }
}


export const resetPassword = async(req, res) =>{

    const {newPassword,confirmPassword} = req.body;
    const email = req.params.email;

    try {

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message: "User not found"});
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({success:false, message: "Passwords do not match"});
        }

        const hashPassword = await bcrypt.hash(newPassword,10);
        user.password = hashPassword;
        await user.save();
        res.status(200).json({success:true, message: "Password reset successfully"});
        
    } catch (error) {

        return res.status(500).json({success:false, message: error.message});
        
    }
}

export const getProfile = async (req, res) => {
    try {

        const user = req.userId

        const safeUser = await User.findById(user).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }



        return res.status(200).json({
            success: true,
            user:safeUser,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
