import cartMongooseDao from "../daos/mongoose/cartMongooseDao.js";

class CartManager{
    constructor(){
        this.cartOfMongooseDao = new cartMongooseDao();
    }
    async getCartById(id){
        try {
            return this.cartOfMongooseDao.getOneCart(id);
        } catch (error) {
            throw new Error (error);
        }
    }
    async addCart(){
        try {
            return this.cartOfMongooseDao.createCart()
        } catch (error) {
            throw new Error (error);
        }
    }
    async addToCart(idC, idP){
        try { 
            return this.cartOfMongooseDao.addProductToCart(idC, idP )
        } catch (error) {
            throw new Error (error);
        }
    }
    async deleteProducts(idC){
        try { 
            return this.cartOfMongooseDao.deleteProducts(idC)
        } catch (error) {
            throw new Error (error);
        }
    }
    async deleteProduct(idC, idP){
        try { 
            return this.cartOfMongooseDao.deleteProduct(idC, idP )
        } catch (error) {
            throw new Error (error);
        }
    }
    async updateProduct(quantity, idC, idP){
        try { 
            return this.cartOfMongooseDao.updateProduct(quantity, idC, idP )
        } catch (error) {
            throw new Error (error);
        }
    }
    async updateCart(products, idC){
        try { 
            return this.cartOfMongooseDao.updateProducts(products, idC)
        } catch (error) {
            throw new Error (error);
        }
    }

}
export default  CartManager;