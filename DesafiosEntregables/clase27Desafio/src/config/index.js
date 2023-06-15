const config = {
    env: process.env.NODE_ENV,
    port: process.env.NODE_PORT,
    dbUri: process.env.MONGO_DB_URI,
    privateKey: process.env.PRIVATE_KEY
}

export default config;