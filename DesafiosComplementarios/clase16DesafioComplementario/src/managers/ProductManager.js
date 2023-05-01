import productMongooseDao from "../daos/mongoose/productMongooseDao.js";

class ProductManager{
    constructor(){
        this.productOfMongooseDao = new productMongooseDao();
    }
    
    async listProducts(){
        try {
            return this.productOfMongooseDao.getProducts();
        } catch (error) {
            throw new Error (error);
        }
    }
    async getProductById(id){
        try {
            return this.productOfMongooseDao.getOneProduct(id);
        } catch (error) {
            throw new Error (error);
        }
    }
    async addProduct(data){
        try {
            return this.productOfMongooseDao.createProduct(data)
        } catch (error) {
            throw new Error (error);
        }
    }
    async updateProduct(id, data){
        try {
            return this.productOfMongooseDao.updateProduct(id, data)
        } catch (error) {
            throw new Error (error);
        }
    }

    async deleteOneProduct(id){
        try {
            return this.productOfMongooseDao.deleteProduct(id);
        } catch (error) {
            throw new Error (error);
        }
    }
}
export default  ProductManager;