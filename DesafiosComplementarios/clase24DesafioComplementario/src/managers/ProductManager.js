import ProductMongooseDao from "../daos/mongoose/productMongooseDao.js";
import productCreateValidation from '../validations/product/productCreateValidation.js'
import productUpdateValidation from '../validations/product/productUpdateValidation.js'
import idValidation from "../validations/shared/idValidation.js";

class ProductManager{
    constructor(){
        this.productOfMongooseDao = new ProductMongooseDao();
    }
    //Revisar list producto p/agregar con criteria
    async listProducts(sort, inStock){
        return this.productOfMongooseDao.getProducts(sort, inStock);
    }
    async getProductById(id){
        await idValidation.parseAsync({id}); 
        return this.productOfMongooseDao.getOneProduct(id);
    }
    //Agregar getProductByCode
    async addProduct(data){
        await productCreateValidation.parseAsync(data)
        return this.productOfMongooseDao.createProduct(data);
    }
    async updateProduct(id, data){
        await productUpdateValidation.parseAsync({...data, id});
        return this.productOfMongooseDao.updateProduct(id, data);
    }

    async deleteOneProduct(id){
        await idValidation.parseAsync({id}); 
        return this.productOfMongooseDao.deleteProduct(id);
    }
}
export default  ProductManager;