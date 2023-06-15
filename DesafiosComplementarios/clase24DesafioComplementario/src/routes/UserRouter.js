import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import authorization from '../middlewares/authorization.js';
import auth from "../middlewares/auth.js";

const userRouter = Router();
userRouter.get('/', auth, authorization('getUsers'), UserController.list);
userRouter.get('/:id', auth, authorization('getUseById'), UserController.getOne);
userRouter.get('/', auth, authorization('getUserByEmail'), UserController.getOneByEmail);
userRouter.post('/', auth, authorization('saveUser'), UserController.save);
userRouter.put('/:id', auth, authorization('updateUser'), UserController.update);
userRouter.delete('/:id', auth, authorization('deleteUser'), UserController.delete);

export default userRouter;