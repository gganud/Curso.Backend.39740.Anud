/* 
***CONSIGNA DESAFIO***
Consigna
Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:

Aspectos a incluir
  *Crear un modelo User el cual contará con los campos:
    -first_name:String,
    -last_name:String,
    -email:String (único)
    -age:Number,
    -password:String(Hash)
    -cart:Id con referencia a Carts
    -role:String(default:’user’)
  *Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios
  *Modificar el sistema de login del usuario para poder trabajar con jwt. 
  *Desarrollar un endpoint “current” para extraer la cookie que contiene el token para obtener el usuario asociado a dicho token, en caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error.

Formato
Link al repositorio de GitHub con el proyecto completo.
 */

import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cookieParser from "cookie-parser";

import mongoConnect from "./config/mongoAtlasConfig.js"
import cartRouter from './routes/CartRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from "./routes/userRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import roleRouter from "./routes/roleRouter.js";
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
      
      app.use('/api/carts', cartRouter);
      app.use('/api/products', productRouter);
      app.use('/api/users', userRouter);
      app.use('/api/sessions', sessionRouter);
      app.use('/api/roles', roleRouter);
      
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