import jwt from 'jsonwebtoken';
import config from '../config/index.js';
class TokenJWT
{
    static generate = async(user) =>
{
        return await jwt.sign({ user: { ...user, password: undefined } }, config.privateKey, { expiresIn: '10m' });
    };
}

export default TokenJWT;
