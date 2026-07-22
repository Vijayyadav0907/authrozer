import dotenv from "dotenv";

dotenv.config();


const Config = {
    PORT: process.env.PORT || 7000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    MAIL: process.env.USER_MAIL,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    CLIENT_URL: process.env.CLIENT_URL
};

export default Config;

