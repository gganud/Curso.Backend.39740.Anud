import { Router } from 'express';
import ProductManager from "../controllers/ProductManager.js"
const RealTimeProductsRouter = Router();
const productManager = new ProductManager()

const main = async () =>{
    RealTimeProductsRouter.get('/', async (req, res) => {
        const productList = await productManager.getProducts()
        res.render('realTimeProducts', {title: 'Lista de Productos', name: 'Lista de Productos', productList});
    });
}
main()
export default RealTimeProductsRouter;