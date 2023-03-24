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
import ProductManager from "./ProductManager.js"

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