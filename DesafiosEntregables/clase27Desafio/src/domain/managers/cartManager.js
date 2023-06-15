import CartMongooseDao from "../../data/daos/mongoose/cartMongooseDao.js";
import idValidation from "../validations/shared/idValidation.js";
import quantityValidation from "../validations/cart/quantityValidation.js";
class CartManager{
    constructor(){
        this.cartOfMongooseDao = new CartMongooseDao();
    }
    async getCartById(id){
        await idValidation.parseAsync({id});   
        return this.cartOfMongooseDao.getOneCart(id);
    }

    async addCart(){
        return this.cartOfMongooseDao.createCart();
    }

    async addToCart(idC, idP){
        await idValidation.parseAsync({idC, idP});   
        return this.cartOfMongooseDao.addProductToCart(idC, idP );
    }
    async deleteProducts(idC){
        await idValidation.parseAsync({idC}); 
        return this.cartOfMongooseDao.deleteProducts(idC);
    }

    async deleteProduct(idC, idP){
        await idValidation.parseAsync({idC, idP});   
        return this.cartOfMongooseDao.deleteProduct(idC, idP);
    }

    async updateProduct(quantity, idC, idP){
        await quantityValidation.parseAsync({quantity});
        await idValidation.parseAsync({idC, idP});   
        return this.cartOfMongooseDao.updateProduct(quantity, idC, idP);
    }
    async updateCart(products, idC){
        await idValidation.parseAsync({idC});
        return this.cartOfMongooseDao.updateProducts(products, idC);
    }
}

export default  CartManager;