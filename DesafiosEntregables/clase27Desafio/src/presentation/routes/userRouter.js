import { Router } from 'express';
import UserController from '../../presentation/controllers/userController.js';
import authorization from '../../presentation/middlewares/authorization.js';
import auth from "../../presentation/middlewares/auth.js";

const userRouter = Router();

userRouter.use(auth);

userRouter.get('/', authorization('getUsers'), UserController.list);
userRouter.get('/:id', authorization('getUseById'), UserController.getOne);
userRouter.get('/', authorization('getUserByEmail'), UserController.getOneByEmail);
userRouter.post('/', authorization('saveUser'), UserController.save);
userRouter.put('/:id', authorization('updateUser'), UserController.update);
userRouter.delete('/:id', authorization('deleteUser'), UserController.delete);

export default userRouter;