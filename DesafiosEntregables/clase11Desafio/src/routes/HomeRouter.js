import { Router } from 'express';
import ProductManager from "../controllers/ProductManager.js"
const HomeRouter = Router();
const productManager = new ProductManager()

const main = async () =>{
    HomeRouter.get('/', async (req, res) => {
        const productList = await productManager.getProducts()
        res.render('homeView', {title: 'Lista de Productos', name: 'Lista de Productos', productList});
    });
}
main()
export default HomeRouter;