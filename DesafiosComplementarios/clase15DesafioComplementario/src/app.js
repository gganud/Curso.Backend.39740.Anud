/* 
***CONSIGNA DESAFIO***
Consigna:
Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:
Aspectos a incluir:
*Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto.
*Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones “carts”, “products” y sus respectivos schemas.
*Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta “dao”. Dentro de dao, agregar también una carpeta “models” donde vivirán los esquemas de MongoDB. La estructura deberá ser igual a la vista en esta clase
*Contener todos los Managers (FileSystem y DB) en una carpeta llamada “Dao”
*Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem
*NO ELIMINAR FileSystem de tu proyecto.
*Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.
Formato:
Link al repositorio de GitHub con el proyecto completo (No incluir node_modules).
Sugerencias:
Te recomendamos que, para este entregable, repitas las pruebas realizadas en la pre-entrega de la clase 8.
 */
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import CartRouter from './routes/CartRouter.js';
import ProductRouter from './routes/ProductRouter.js';
import mongoose from "mongoose";
/* import productMongooseDao from ".//daos/mongoose/productMongooseDao.js"; */
void(async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      const PORT = process.env.SERVER_PORT
      const app = express();
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use('/api/carts', CartRouter);
      app.use('/api/products', ProductRouter);
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      })
      /* const productOfMongooseDao = new productMongooseDao();
      productOfMongooseDao.addfield(); */
    } 
    catch (error) {
        console.log("Error: ");
        console.log(error);
    }
})()