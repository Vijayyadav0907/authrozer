import mongoose from "mongoose";
import Config from "./Config.js";


export const connectDB = async () =>{
    try {
        await mongoose.connect(Config.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}


