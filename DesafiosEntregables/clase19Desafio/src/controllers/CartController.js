import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";
class CartController{
    static getOneCart = async (req, res) => {
        const { cid } = req.params
        const cartManager = new CartManager();
        const cart = await cartManager.getCartById(cid)
        res.send({status: "success", payload: cart});
    }

    static saveCart = async (req, res) => {
        const cartManager = new CartManager();
        const cartAdded = await cartManager.addCart()
        res.send({status: "success", payload: cartAdded, message: 'Cart created.'});
    }

    static addProduct = async (req, res) => {
        const { cid } = req.params
        const { pid } = req.params
        const productManager = new ProductManager();
        const cartManager = new CartManager();
        const searchProduct = await productManager.getProductById(pid)     
        const productAdded = await cartManager.addToCart(cid, searchProduct.id)
        res.send({status: "sucess", payload: productAdded, message: 'Product added.'});
    }

    static deleteProduct = async (req, res) => {
        const { cid } = req.params
        const { pid } = req.params
        const productManager = new ProductManager();
        const cartManager = new CartManager();
        const searchProduct = await productManager.getProductById(pid)     
        const productDeleted = await cartManager.deleteProduct(cid, searchProduct.id)
        res.send({status: "sucess", payload: productDeleted, message: 'Product deleted.'});
    }

    static deleteProducts = async (req, res) => {
        const { cid } = req.params
        const cartManager = new CartManager(); 
        const cartCleared = await cartManager.deleteProducts(cid)
        res.send({status: "sucess", payload: cartCleared, message: 'Cart empty.'});
    }    

    static updateProduct = async (req, res) => {
        const { cid } = req.params
        const { pid } = req.params
        const data = req.body
        const productManager = new ProductManager();
        const cartManager = new CartManager();
        const searchProduct = await productManager.getProductById(pid)     
        const productUpdated = await cartManager.updateProduct(data.quantity, cid, searchProduct.id)
        res.send({status: "sucess", payload: productUpdated, message: 'Product updated.'});
    }
    
    static updateCart = async (req, res) => {
        const { cid } = req.params
        const products = req.body
        const cartManager = new CartManager();   
        const cartUpdated = await cartManager.updateCart(products, cid)
        res.send({status: "sucess", payload: cartUpdated, message: 'Cart updated.'});
    }
}
export default CartController;