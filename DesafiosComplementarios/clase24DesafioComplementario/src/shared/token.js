import jwt from "jsonwebtoken";

class TokenJWT{
    static generate = async (user) =>{
        return await jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '1m' });
    }
}

export default TokenJWT