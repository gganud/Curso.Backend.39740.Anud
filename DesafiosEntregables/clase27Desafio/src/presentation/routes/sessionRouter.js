import { Router } from 'express';
import SessionController from '../../presentation/controllers/SessionController.js'
import auth from "../../presentation/middlewares/auth.js";

const sessionRouter = Router();

sessionRouter.post('/login', SessionController.login);
sessionRouter.get('/current', auth, SessionController.current);
/* SessionRouter.post('/logout', SessionController.logout); */
sessionRouter.post('/signup', SessionController.signup);

export default sessionRouter;