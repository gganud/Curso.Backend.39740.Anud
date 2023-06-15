import ProductManager from "../../domain/managers/productManager.js";

class ProductController{
    static listProducts = async (req, res, next) =>{  
        try {
            const productManager = new ProductManager();
            const { sort, inStock } = req.query;
            const productList = await productManager.listProducts(sort, inStock);
            res.status(200).send({status: "success", payload: productList});
        } 
        catch (e) {
            next(e)
        }
    }

    static getOneProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const productManager = new ProductManager();
            const product = await productManager.getProductById(id);
            res.status(200).send({status: "success", payload: product});
        } 
        catch (e) {
            next(e)
        }
    }

    static save = async (req, res, next) => {
        try {
            const product = req.body;
            //Validar que los campos sean completados correctamente.
            if(!product.title || !product.description || !product.price || !product.code || !product.stock){
                return res.status(400).send({status: "error", error: "Valores incompletos, por favor ingresar todos los campos del producto."});
            }
            const productManager = new ProductManager();
            const productAdded = await productManager.addProduct(product);
            res.status(201).send({status: "success", payload: productAdded, message: 'Product created.'});
        } 
        catch (e) {
            next(e)
        }
    }

    static update = async (req, res, next) => {
        try {
            let productData = req.body;
            let { id } = req.params;
            //Validar que los campos sean completados correctamente.
            if(!productData.title || !productData.description || !productData.price || !productData.code || !productData.stock){
                return res.status(400).send({status: "error", error: "Valores incompletos, por favor ingresar todos los campos del producto."});
            }
            const productManager = new ProductManager();
            const productUpdated = await productManager.updateProduct(id, productData);
            res.status(201).send({ status: 'succcess', payload: productUpdated, message: 'Product updated.'});
        } 
        catch (e) {
            next(e)
        }
      }

    static delete = async (req, res, next) => {
        try {
            const id = req.params.id;
            const productManager = new ProductManager();
            const productDeleted = await productManager.deleteOneProduct(id)
            res.status(201).send({ status: 'success', payload: productDeleted, message: 'Product deleted.'});
        } 
        catch (e) {
            next(e)
        }
      }
}
export default ProductController;