import dotenv from "dotenv";
dotenv.config();

const config = {
    //env: process.env.NODE_ENV, en desuso!!
    port: process.env.NODE_PORT,
    db: process.env.MONGO_DB,
    dbUri: process.env.MONGO_DB_URI,
    privateKey: process.env.PRIVATE_KEY_TOKEN,
    mail: process.env.SMTP_MAIL,
    mailKey: process.env.SMTP_KEY,
    configMail: {
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_KEY
        }
    },
}

export default config;