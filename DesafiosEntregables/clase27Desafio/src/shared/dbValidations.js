import ProductManager from "../managers/productManager.js";
import CartManager from "../managers/cartManager.js";

class DBValidations{
    static codeExist = async (code = "") => {
        try {
            const manager = new ProductManager();
            const isExist = await manager.getOneCode(code);
            if (isExist) throw new Error(`El codigo ${code} ya existe`);
        } catch (error) {
            throw error;
        }
    };
    
    static productExist = async (id = "") => {
        try {
            const manager = new ProductManager();
            const isExist = await manager.getProductById(id);
            if (!isExist) throw new Error(`El producto con el id ${id} no existe o se encuentra eliminado`);
        } catch (error) {
            throw error;
        }
    };
    
    static cartExist = async (id = "") => {
        try {
            const manager = new CartManager();
            const isExist = await manager.getCartById(id);
            if (!isExist) throw new Error(`El carrito de compra con el id ${id} no existe`);
        } catch (error) {
            throw error;
        }
    };
}

export default DBValidations
