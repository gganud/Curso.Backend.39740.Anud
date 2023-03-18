/* 
***CONSIGNA DESAFIO***
Manejo de archivos
Se creará una instancia de la clase “ProductManager”
Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
Se llamará al método “addProduct” con los campos:
title: “producto prueba”
description:”Este es un producto prueba”
price:200,
thumbnail:”Sin imagen”
code:”abc123”,
stock:25
El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
 */
const fs = require("fs").promises;

class ProductManager{
    productsIdAuto = 1;
    #products = [];
    path = ``;
    constructor(){
        this.#products = [];
        this.path = `./products.json`;
    }
    
    async addProduct(productData){
        try {
            const productsFile = await fs.readFile(this.path, "utf-8");
            let newProducts = JSON.parse(productsFile);
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
            const productsFile = await fs.readFile(this.path, "utf-8");
            let newProducts = JSON.parse(productsFile);
            
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
            const productsFile = await fs.readFile(this.path, "utf-8");
            let newProducts = JSON.parse(productsFile);
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
            const productsFile = await fs.readFile(this.path, "utf-8");
            let newProducts = JSON.parse(productsFile);
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
const product1 = {
    title: "producto prueba", 
    description: "Este es un producto prueba", 
    price: 200, 
    thumbnail: "Sin imagen", 
    code: "abc123", 
    stock: 25
}
const product2 = {
    title: "producto prueba2", 
    escription: "Este es un producto prueba2", 
    price: 200, 
    thumbnail: "Sin imagen", 
    code: "abc1234", 
    stock: 25
}
const product1Update = {
    title: "producto prueba MODIFICADO", 
    description: "Este es un producto prueba", 
    price: 200, 
    thumbnail: "Sin imagen", 
    code: "abc123", 
    stock: 25
}

const productManager = new ProductManager()
const main = async () => {
    console.log("Listado de productos inicial: ", await productManager.getProducts());
    console.log(await productManager.addProduct(product1));
    console.log(await productManager.addProduct(product2));
    console.log("Listado de productos: ", await productManager.getProducts());
    console.log("Producto de id 1: ", await productManager.getProductById(1));
    console.log("Producto de id 2: ", await productManager.getProductById(2));
    console.log("Producto de id 3: ", await productManager.getProductById(3));
    console.log(await productManager.updateProduct(1, product1Update));
    console.log("Listado de productos: ", await productManager.getProducts());
    console.log("Se elimina el producto de id 2: ", await productManager.deleteProduct(2));
    console.log("Listado de productos: ", await productManager.getProducts());
    console.log("Se elimina el producto de id 3: ", await productManager.deleteProduct(3));
}

main();
