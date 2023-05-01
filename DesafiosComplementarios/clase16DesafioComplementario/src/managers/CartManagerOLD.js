import * as fs from "fs/promises";
class CartManager{
    cartIdAuto = 1;
    #newCart = [];
    path = ``;
    constructor(){
        this.#newCart = [];
        this.path = `./src/db/carts.json`;
        
    }
    
    //Lee datos del JSON.
    async readData (){
        const cartsFile = await fs.readFile(this.path, "utf-8");
        return   JSON.parse(cartsFile);
    }

    async addCart(){
        try {
            const newCart = await this.readData()
            //Se busca el último Id utilizado
            if (newCart.length > 0) {
                const lastCart = newCart[newCart.length - 1];
                this.cartIdAuto = lastCart.id + 1;
              }
            
            //Se agrega el carrito al array
            newCart.push({
                id: this.cartIdAuto++,
                products: [],
              });
            await fs.writeFile(this.path, JSON.stringify(newCart, null, 2));
            return "Carrito agregado correctamente";
        } catch (error) {
            fs.writeFile(this.path, "[]");
        }
    }
    
    async getCartById(id){
        try {
            const newCarts = await this.readData()
            const CartId = newCarts.find(
                (cart) => cart.id === id 
              );
            if (!CartId) {
                return {Error: "El Id no corresponde a un carrito"}
              }
            return CartId;
        } catch (error) {
            throw new Error (error);
        }
    }
    
    async addProductToCart(idCart, idProduct){
        try {
            const newCart = await this.readData()
            const cartId = newCart.find(
                (cart) => cart.id === idCart 
              );
            if (!cartId) {
                return {Error: "El Id no corresponde a un carrito"}
            }
            if (!idProduct) {
                return {Error: "El Id no corresponde a un producto"}
            }
            const productId = cartId.products.find(
                (p) => p.id === idProduct)
            const productIdIndex = cartId.products.findIndex(
                    (p) => p.id === idProduct);
            if (!productId){
                await cartId.products.push({id: idProduct, quantity: 1})
            }
            else{
                await cartId.products.splice(productIdIndex,1,{id: idProduct, quantity: productId.quantity+1})
            }
            await fs.writeFile(this.path, JSON.stringify(newCart, null, 2));
            return "Producto agregado al carrito correctamente";
        } catch (error) {
            throw new Error (error);
        }
    }
    
}

export default  CartManager;

