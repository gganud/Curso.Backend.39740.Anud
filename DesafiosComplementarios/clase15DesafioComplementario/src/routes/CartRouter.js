import { Router } from 'express';
import CartController from '../controllers/CartController.js'
const CartRouter = Router();

CartRouter.post('/', CartController.saveCart);
CartRouter.get('/:id', CartController.getOneCart);
CartRouter.post('/:cid/product/:pid', CartController.update);

export default CartRouter;