import { Router } from 'express';
import CartManager from "../controllers/CartManager.js"
import ProductManager from "../controllers/ProductManager.js"
const CartRouter = Router();
const cartManager = new CartManager()
const productManager = new ProductManager()
const main = async () => {
    await cartManager.addCart()
    CartRouter.post('/', async (req, res) => {
        const cartAdded = await cartManager.addCart()
        res.send({status: "sucess", callback: cartAdded});
    });
    CartRouter.get('/:id', async (req, res) => {
        const id = +req.params.id
        const cartId = await cartManager.getCartById(id)
        res.send({status: "sucess", callback: cartId});
    });
    CartRouter.post('/:cid/product/:pid', async (req, res) => {
        const cartId = +req.params.cid
        const productId = +req.params.pid
        const searchProduct = await productManager.getProductById(productId)     
        const productAdded = await cartManager.addProductToCart(cartId, searchProduct.id)
        res.send({status: "sucess", callback: productAdded});
    });
}

main();

export default CartRouter;