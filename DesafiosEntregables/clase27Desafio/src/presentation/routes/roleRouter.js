import { Router } from 'express';
import RoleController from '../../presentation/controllers/roleController.js'
import auth from "../../presentation/middlewares/auth.js";
import authorization from "../../presentation/middlewares/authorization.js";

const roleRouter = Router();

roleRouter.get('/', auth, authorization('getRoles'), RoleController.list);
roleRouter.get('/:id', auth, authorization('getRole'), RoleController.getOne);
roleRouter.post('/', auth, auth, authorization('saveRole'), RoleController.save);
roleRouter.put('/:id', auth, authorization('updateRole'), RoleController.update);
roleRouter.delete('/:id', auth, authorization('deleteRole'), RoleController.deleteOne);

export default roleRouter;
