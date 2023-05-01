import ProductManager from "../managers/ProductManager.js";
class ProductController{
    static listProducts = async (req, res) =>{
        const productManager = new ProductManager();
        const limit = +req.query.limit;
        const productList = await productManager.listProducts()
        if(limit > 0 && limit < productList.length)
            { 
            res.send({status: "success", callback: productList.slice(0, limit)});
            }
        else{
            res.send({status: "success", callback: productList});
        }
    }

    static getOneProduct = async (req, res) => {
        const { id } = req.params
        const productManager = new ProductManager();
        const product = await productManager.getProductById(id)
        res.send({status: "success", callback: product});
    }

    static save = async (req, res) => {
        const product = req.body;
        //Validar que los campos sean completados correctamente.
        if(!product.title || !product.description || !product.price || !product.code || !product.stock){
            return res.status(400).send({status: "error", error: "Valores incompletos, por favor ingresar todos los campos del producto."})
        }
        const productManager = new ProductManager();
        const productAdded = await productManager.addProduct(product)
        res.send({status: "success", callback: productAdded, message: 'Product created.'});
    }

    static update = async (req, res) => {
        let productData = req.body;
        let { id } = req.params;
        //Validar que los campos sean completados correctamente.
        if(!productData.title || !productData.description || !productData.price || !productData.code || !productData.stock){
            return res.status(400).send({status: "error", error: "Valores incompletos, por favor ingresar todos los campos del producto."})
        }
        const productManager = new ProductManager();
        const productUpdated = await productManager.updateProduct(id, productData)
        res.send({ status: 'succcess', callback: productUpdated, message: 'Product updated.'});
      }

    static delete = async (req, res) => {
        const id = req.params.id;
        const productManager = new ProductManager();
        const productDeleted = await productManager.deleteOneProduct(id)
        res.send({ status: 'success', callback: productDeleted, message: 'Product deleted.'});
      }
}
export default ProductController;