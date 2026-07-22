import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true, index: true},
    email:{type: String, required: true, unique: true, index: true},
    password:{type: String, required: true, unique: true, index: true},
    isverified:{type: Boolean, default: false},
    isLogin:{type: Boolean, default: false},
    otp:{type: String, default: null},
    otp_expiry:{type: Date, default: null},
},{timestapms: true});

export const User = mongoose.model("User", UserSchema);