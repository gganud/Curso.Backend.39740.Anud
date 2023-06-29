import { Router } from 'express';
import ProductController from '../../presentation/controllers/productController.js'
import auth from  '../../presentation/middlewares/auth.js';
import authorization from '../../presentation/middlewares/authorization.js';

const productRouter = Router();

productRouter.get('/', ProductController.listProducts);
productRouter.get('/:id', ProductController.getProductById);
productRouter.post('/', auth, authorization('saveProduct'), ProductController.save);
productRouter.put('/:id', auth, authorization('updateProduct'), ProductController.update);
productRouter.delete('/:id', auth, authorization('deleteProduct'), ProductController.delete);

export default productRouter;