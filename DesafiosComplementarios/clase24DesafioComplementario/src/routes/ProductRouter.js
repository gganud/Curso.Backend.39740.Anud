import { Router } from 'express';
import ProductController from '../controllers/ProductController.js'
import auth from  '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const productRouter = Router();

productRouter.get('/', ProductController.listProducts);
productRouter.get('/:id', ProductController.getOneProduct);
productRouter.post('/', auth, authorization('saveProduct'), ProductController.save);
productRouter.put('/:id', auth, authorization('updateProduct'), ProductController.update);
productRouter.delete('/:id', auth, authorization('deleteProduct'), ProductController.delete);

export default productRouter;