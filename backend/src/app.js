import express from "express";
import CookieParser from "cookie-parser";
import UserRouter from "./Routes/User.route.js";
import morgan from "morgan";
import cors from "cors";






const app = express();



app.use(morgan("dev"));
app.use(express.json());
app.use(CookieParser());
app.use(cors({
    origin: "http://localhost:400",
    credentials: true
}));



app.use("/api/user", UserRouter);




export default app;