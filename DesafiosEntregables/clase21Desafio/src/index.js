/* 
***CONSIGNA DESAFIO***
Consigna
Con base en el login de nuestro entregable anterior, refactorizar para incluir los nuevos conceptos.

Aspectos a incluir
  *Se deberá contar con un hasheo de contraseña utilizando bcrypt.
  *Hacer el login con JWT.
  *OPCIONAL: Agregar errorHandler del ejercicios y ademas zod validation

Formato
Link al repositorio de Github sin node_modules
 */

import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cookieParser from "cookie-parser";

import mongoConnect from "./config/mongoAtlasConfig.js"
import CartRouter from './routes/CartRouter.js';
import ProductRouter from './routes/ProductRouter.js';
import UserRouter from "./routes/UserRouter.js";
import SessionRouter from "./routes/SessionRouter.js";
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';

/* import productMongooseDao from ".//daos/mongoose/productMongooseDao.js"; */
void(async () => {
    try {
      mongoConnect.connect()
      const PORT = process.env.SERVER_PORT
      const app = express();
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cookieParser());
      app.use(logger);
      app.use('/api/carts', CartRouter);
      app.use('/api/products', ProductRouter);
      app.use('/api/users', UserRouter);
      app.use('/api/sessions', SessionRouter);
      app.use(errorHandler);
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