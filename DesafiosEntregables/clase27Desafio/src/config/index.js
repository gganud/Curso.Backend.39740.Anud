import dotenv from "dotenv";
dotenv.config();

const config = {
    //env: process.env.NODE_ENV, en desuso!!
    port: process.env.NODE_PORT,
    dbUri: process.env.MONGO_DB_URI,
    privateKey: process.env.PRIVATE_KEY
}

export default config;