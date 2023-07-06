import jwt from "jsonwebtoken";
import config from '../../config/index.js';

const auth = (req, res, next) =>{
  const authHeader = req.headers.authorization;
  if (!authHeader){
    return res.status(401).send({ message: 'Empty authentication header!'})
  }
  const token = authHeader.split(' ')[1]; // Bearer tokenString
  jwt.verify(token, config.privateKey, (error, credentials) =>{
    if(error) return res.status(403).send({ error: 'Authentication error'});
    req.user = credentials.user;
    next();
  });
}

export default auth;