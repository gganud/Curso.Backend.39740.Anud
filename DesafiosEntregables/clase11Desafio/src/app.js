/* 
***CONSIGNA DESAFIO***
Websockets + Handlebars. 
Integrar vistas y sockets a nuestro servidor actual.

Consigna: 
*Configurar nuestro proyecto para que trabaje con Handlebars y websocket.
Aspectos a incluir:
*Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.
*Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento
*Además, crear una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint “/realtimeproducts” en nuestro views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.
    +Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.
Sugerencias
*Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un formulario simple en la vista  realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.
Formato de entrega
*Link al repositorio de Github, el cual debe contar con todo el proyecto.
*No incluir node_modules
 */
import express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from 'socket.io';
import CartRouter from './routes/CartRouter.js';
import ProductRouter from './routes/ProductRouter.js';
import HomeRouter from './routes/HomeRouter.js';
import RealTimeProductsRouter from './routes/RealTimeProductsRouter.js';
import ProductManager from "./controllers/ProductManager.js"
void(async () => {
    try {
        const SERVER_PORT = 8080
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/api/carts', CartRouter);
        app.use('/api/products', ProductRouter);
        app.use('/', HomeRouter);
        app.use('/realtimeproducts', RealTimeProductsRouter);
        
        const viewsPath = resolve('src/views');
        app.engine('handlebars', engine({
            layoutsDir: `${viewsPath}/layouts`,
            defaultLayout: `${viewsPath}/layouts/main.handlebars`,
        }));
        app.set('view engine', 'handlebars');
        app.set('views', viewsPath);
        const httpServer = app.listen(SERVER_PORT, () => {
            console.log(`Server listening on port ${SERVER_PORT}`);
        })
        const socketServer = new Server(httpServer);
        socketServer.on('connection', socket =>
        {
        const productManager = new ProductManager()
        console.log('Nuevo cliente conectado');
        socket.on('removeProduct', async (data) =>
          {
            await productManager.deleteProduct(+data)
            socketServer.emit('productRemoved', data)
          });
          socket.on('addProduct', async (data) =>
          {
            await productManager.addProduct(data);
            const listproducts = await productManager.getProducts();
            const product = listproducts[listproducts.length-1]
            socketServer.emit('productAdded', product)
          });
        })
    } 
    catch (error) {
        console.log("Error: ");
        console.log(error);
    }
})()