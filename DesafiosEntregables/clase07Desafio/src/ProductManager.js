import * as fs from "fs/promises";
class ProductManager{
    productsIdAuto = 1;
    #newProducts = [];
    path = ``;
    constructor(){
        this.#newProducts = [];
        this.path = `./products.json`;
    }
    
    //Lee datos del JSON.
    async readData (){
        const productsFile = await fs.readFile(this.path, "utf-8");
        return   JSON.parse(productsFile);
    }

    async addProduct(productData){
        try {
            const newProducts = await this.readData()
            
            //Valido Id/Code no utilizado aún.
            const validIdCode = newProducts.find(
                (product) => product.id === productData.id || product.code === productData.code
              );
        
              if (validIdCode) {
                return "Id y/o Código repetido. No se puede agregar el producto";
              }

            //Se busca el último Id utilizado
            if (newProducts.length > 0) {
                const lastProduct = newProducts[newProducts.length - 1];
                this.productsIdAuto = lastProduct.id + 1;
              }
            //Se agrega el producto al array
            newProducts.push({
                id: this.productsIdAuto++,
                ...productData,
              });
            await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2));
            return "Producto agregado correctamente";
        } catch (error) {
            throw new Error (error);
        }
    }
    async getProducts(){
        try {
            const productsFile = await fs.readFile(this.path, "utf-8");
            return JSON.parse(productsFile);
        } catch (error) {
            await fs.writeFile(this.path, "[]");
            return "No existe el archivo de productos. Ya se creó uno con un array vacío";
        }
    }
    async getProductById(id){
        try {
            const newProducts = await this.readData()
            const productId = newProducts.find(
                (product) => product.id === id 
              );
            if (!productId) {
                return {Error: "El Id no corresponde a un producto"}
              }
            return productId;
        } catch (error) {
            throw new Error (error);
        }
    } 
}

export default  ProductManager;

