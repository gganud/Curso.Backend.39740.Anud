/* 
***CONSIGNA DESAFIO***
Servidores con express
Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.

Se instalarán las dependencias a partir del comando npm install
Se echará a andar el servidor
Se revisará que el archivo YA CUENTE CON AL MENOS DIEZ PRODUCTOS CREADOS al momento de su entrega, es importante para que los tutores no tengan que crear los productos por sí mismos, y así agilizar el proceso de tu evaluación.
Se corroborará que el servidor esté corriendo en el puerto 8080.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
 */

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
                throw new Error("Id y/o Código repetido. No se puede agregar el producto");
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
                return "El Id no corresponde a un producto"
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

