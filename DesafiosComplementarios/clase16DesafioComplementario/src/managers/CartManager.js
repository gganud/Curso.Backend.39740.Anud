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
    async updateCart(idC, idP){
        try {
            
            return this.cartOfMongooseDao.addProductToCart(idC, idP )
        } catch (error) {
            throw new Error (error);
        }
    }
}
export default  CartManager;