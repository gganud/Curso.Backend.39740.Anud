import { Router } from 'express';
import SessionController from '../controllers/SessionController.js'

const SessionRouter = Router();

SessionRouter.post('/login', SessionController.login);
SessionRouter.post('/logout', SessionController.logout);
SessionRouter.post('/signup', SessionController.signup);

export default SessionRouter;