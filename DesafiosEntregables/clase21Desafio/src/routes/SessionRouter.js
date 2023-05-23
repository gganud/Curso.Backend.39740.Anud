import { Router } from 'express';
import SessionController from '../controllers/SessionController.js'
import auth from "../middlewares/auth.js";

const SessionRouter = Router();

SessionRouter.post('/login', SessionController.login);
SessionRouter.get('/current', auth, SessionController.current);
/* SessionRouter.post('/logout', SessionController.logout); */
SessionRouter.post('/signup', SessionController.signup);

export default SessionRouter;