import { Router } from 'express';
import ProductController from '../controllers/productController.js'

const ProductRouter = Router();
ProductRouter.get('/', ProductController.listProducts);
ProductRouter.get('/:id', ProductController.getOneProduct);
ProductRouter.post('/', ProductController.save);
ProductRouter.put('/:id', ProductController.update);
ProductRouter.delete('/:id', ProductController.delete);

export default ProductRouter;