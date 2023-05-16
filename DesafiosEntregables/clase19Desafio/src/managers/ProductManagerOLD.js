import * as fs from "fs/promises";
class ProductManager{
    productsIdAuto = 1;
    #newProducts = [];
    path = ``;
    constructor(){
        this.#newProducts = [];
        this.path = `./src/db/products.json`;
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
              if (newProducts.find(
                (p) => p.code == productData.code)) {
                return `Código repetido. No se puede agregar el producto con codigo "${productData.code}"`;
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
    
    async updateProduct(id, productData){
        try {
            const newProducts = await this.readData()
            const productIdIndex = newProducts.findIndex(
                (product) => product.id === id 
              );
            const productId = newProducts.find(
                (product) => product.id === id 
              );
            if (!productId) {
                return "El Id no corresponde a un producto"
              }
            newProducts.splice(productIdIndex, 1, {id, ...productData})
            await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2));
            return "Producto actualizado correctamente";
        } catch (error) {
            throw new Error (error);
        }
    }

    async deleteProduct(id){
        try {
            const newProducts = await this.readData()
            const productId = newProducts.find(
                (product) => product.id === id 
              );
            if (!productId) {
                return "El Id no corresponde a un producto"
              }
            const newProductsList = newProducts.filter((products) => products.id !== id)
            await fs.writeFile(this.path, JSON.stringify(newProductsList, null, 2));
            return `Producto de id: ${id} ha sido eliminado correctamente.`;
        } catch (error) {
            throw new Error (error);
        }
    }
}

export default  ProductManager;