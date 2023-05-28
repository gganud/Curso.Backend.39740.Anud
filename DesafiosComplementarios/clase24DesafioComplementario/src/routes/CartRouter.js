import { Router } from 'express';
import CartController from '../controllers/CartController.js'
const CartRouter = Router();

CartRouter.post('/', CartController.saveCart);
CartRouter.get('/:cid', CartController.getOneCart);
CartRouter.post('/:cid/product/:pid', CartController.addProduct);
CartRouter.delete('/:cid/product/:pid', CartController.deleteProduct);
CartRouter.delete('/:cid', CartController.deleteProducts);
CartRouter.put('/:cid', CartController.updateCart);
CartRouter.put('/:cid/product/:pid', CartController.updateProduct);

export default CartRouter;