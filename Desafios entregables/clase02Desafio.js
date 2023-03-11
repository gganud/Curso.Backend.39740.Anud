/* 
***CONSIGNA DESAFIO***
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
Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
 */

class ProductManager{
    constructor(){
        this.products = [];
        this.productsIdAuto = 1;
    }
    addProduct({title, description, price, thumbnail, code, stock}){
        //Validar que los campos sean completados correctamente.
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Error: Por favor ingrese todos los campos del producto correctamente");
            return
        }
        //Validar que el producto no exista ya.
        if (this.products.find((product) => product.code === code)) {
            console.log(`Error: El producto con codigo "${code}" ya existe`);
            return;
          }

        const newProduct = {
            id: this.productsIdAuto,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
          };
          this.productsIdAuto++;
          this.products.push(newProduct);
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find((prod) => prod.id === id);
        if (!product) {
            return `Error: Producto con id "${id}" no encontrado`;
        }
        else{
            return product
        }
    }
}

const productManager = new ProductManager()
console.log("Listado de productos inicial: ", productManager.getProducts());
productManager.addProduct({ title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25})
console.log("Listado de productos: ", productManager.getProducts());
productManager.addProduct({ title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25})
productManager.addProduct({ title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123"})
console.log("Producto de id 1: ", productManager.getProductById(1));
console.log("Producto de id 2: ", productManager.getProductById(2));