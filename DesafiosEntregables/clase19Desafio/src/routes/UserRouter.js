import { Router } from 'express';
import auth from "../middlewares/auth.js";
import UserController from '../controllers/UserController.js'

const UserRouter = Router();
UserRouter.get('/', UserController.list);
UserRouter.get('/:id', UserController.getOne);
UserRouter.post('/', auth, UserController.save);
UserRouter.put('/:id', UserController.update);
UserRouter.delete('/:id', UserController.delete);

export default UserRouter;