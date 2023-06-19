import ProductMongooseDao from "../../data/daos/mongoose/productMongooseDao.js";
import productCreateValidation from '../validations/product/productCreateValidation.js'
import productUpdateValidation from '../validations/product/productUpdateValidation.js'
import idValidation from "../validations/shared/idValidation.js";

class ProductManager{
    constructor(){
        this.productOfMongooseDao = new ProductMongooseDao();
    }
    async listProducts(criteria){
        return this.productOfMongooseDao.getProducts(criteria);
    }
    async getProductById(id){
        await idValidation.parseAsync(id);
        const product = await this.productOfMongooseDao.getOneProductById(id);
        if (product === false){
            throw new Error('Product dont exist.');
        }
        return product;
    }
    async getOneProductByCode(code){
        return this.productOfMongooseDao.getOneProductByCode(code);
    }
    async addProduct(data){
        await productCreateValidation.parseAsync(data);
        return this.productOfMongooseDao.createProduct(data);
    }
    async updateProduct(id, data){
        await productUpdateValidation.parseAsync({id, ...data});
        return this.productOfMongooseDao.updateProduct(id, data);
    }

    async deleteOneProduct(id){
        await idValidation.parseAsync(id); 
        return this.productOfMongooseDao.deleteProduct(id);
    }
}
export default  ProductManager;