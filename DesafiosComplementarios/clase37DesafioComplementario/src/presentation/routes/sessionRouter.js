import { Router } from 'express';
import SessionController from '../controllers/SessionController.js';
import auth from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/login', SessionController.login);
sessionRouter.get('/current', auth, SessionController.current);
sessionRouter.post('/signup', SessionController.signup);

export default sessionRouter;
