/* 
***CONSIGNA DESAFIO***
Consigna
Ajustar nuestro servidor principal para trabajar con un sistema de login.

Aspectos a incluir
  *Deberá contar con todas las vistas realizadas en el hands on lab, así también como las rutas de router para procesar el registro y el login. 
  *Una vez completado el login, realizar la redirección directamente a la vista de productos.
  *Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario
  *Agregar un sistema de roles, de manera que si colocamos en el login como correo adminCoder@coder.com, y la contraseña adminCod3r123, el usuario de la sesión además tenga un campo 
  *Todos los usuarios que no sean admin deberán contar con un rol “usuario”.
  *Implementar botón de “logout” para destruir la sesión y redirigir a la vista de login

Formato
Link al repositorio de Github sin node_modules
 */

import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import session from "express-session";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import CartRouter from './routes/CartRouter.js';
import ProductRouter from './routes/ProductRouter.js';
import SessionRouter from "./routes/SessionRouter.js";
import UserRouter from "./routes/UserRouter.js";

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
      app.use(cookieParser());
      app.use(session({
        store: mongoStore.create({
          mongoUrl: process.env.MONGO_DB_URI,
          ttl: 10
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
      }));
      app.use('/api/carts', CartRouter);
      app.use('/api/products', ProductRouter);
      app.use('/api/sessions', SessionRouter);
      app.use('/api/users', UserRouter);
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