import { Router } from 'express';
import ProductManager from "../controllers/ProductManager.js"
const ProductRouter = Router();
const productManager = new ProductManager()

const main = async () => {
    await productManager.getProducts()
    for (let i = 1; i <= 20; i++) { 
        const product = {
            title: "producto prueba"+i, 
            description: "Este es un producto prueba", 
            price: 200, 
            thumbnail: `../../public/thumbnailsProducts/product${i}`, 
            code: "abc"+i, 
            stock: 25
        }
        await productManager.addProduct(product)
      }

    ProductRouter.get('/', async (req, res) => {
        const limit = +req.query.limit;
        const productList = await productManager.getProducts()
        if(limit > 0 && limit < productList.length)
            { 
            res.send({status: "sucess", callback: productList.slice(0, limit)});
            }
        else{
            res.send({status: "sucess", callback: productList});
        }
    });

    ProductRouter.get('/:id', async (req, res) => {
        const id = +req.params.id
        const productId = await productManager.getProductById(id)
        res.send({status: "sucess", callback: productId});
    });
    ProductRouter.post('/', async (req, res) => {
        const product = req.body;
        //Validar que los campos sean completados correctamente.
        if(!product.title || !product.description || !product.price || !product.code || !product.stock){
            return res.status(400).send({status: "error", error: "Valores incompletos, por favor ingresar todos los campos del producto."})
        }
        const productAdded = await productManager.addProduct(product)
        res.send({status: "sucess", callback: productAdded});
    });
    ProductRouter.put('/:id', async (req, res) => {
        let product = req.body;
        let id = +req.params.id;
        //Validar que los campos sean completados correctamente.
        if(!product.title || !product.description || !product.price || !product.code || !product.stock){
            return res.status(400).send({status: "error", error: "Valores incompletos, por favor ingresar todos los campos del producto."})
        }
        const productUpdated = await productManager.updateProduct(id, product)
        res.status(200).send({ status: 'success', callback: productUpdated });
      })
    
    ProductRouter.delete('/:id', async (req, res) => {
        const id = +req.params.id;
        const productDeleted = await productManager.deleteProduct(id)
        res.status(200).send({ status: 'success', callback: productDeleted });
      });
}

main();

export default ProductRouter;