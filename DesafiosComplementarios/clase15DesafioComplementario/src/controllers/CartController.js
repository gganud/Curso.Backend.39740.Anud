import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";
class CartController{
    static getOneCart = async (req, res) => {
        const { id } = req.params
        const cartManager = new CartManager();
        const cart = await cartManager.getCartById(id)
        res.send({status: "success", callback: cart});
    }

    static saveCart = async (req, res) => {
        const cartManager = new CartManager();
        const cartAdded = await cartManager.addCart()
        res.send({status: "success", callback: cartAdded, message: 'Cart created.'});
    }

    static update = async (req, res) => {
        const { cid } = req.params
        const { pid } = req.params
        const productManager = new ProductManager();
        const cartManager = new CartManager();
        const searchProduct = await productManager.getProductById(pid)     
        const productAdded = await cartManager.updateCart(cid, searchProduct.id)
        res.send({status: "sucess", callback: productAdded});
    }
}
export default CartController;