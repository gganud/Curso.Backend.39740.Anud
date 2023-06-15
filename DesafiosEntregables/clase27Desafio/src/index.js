/* 
***CONSIGNA DESAFIO***
Reestructura de nuestro servidor
Consigna
  *Con base en las clases previamente vistas, realizar los cambios necesarios en tu proyecto para que se base en un modelo de capas.

Aspectos a incluir
  *El proyecto debe contar con capas de data, domain y presentation, con las responsabilidades correctamente delegadas.
  *Además, mover del proyecto todas las partes importantes y comprometedoras en un archivo .env para poder leerlo bajo variables de entorno en un archivo config.js

Formato
  *Link al repositorio de Github para poder clonar, además. adjunto el archivo .env para poder relacionar las variables de entorno.
*/

import dotenv from "dotenv";
dotenv.config();

import mongoConnect from "./config/mongoAtlasConfig.js"

import AppFactory from "./presentation/factories/appFactory.js";

/* import productMongooseDao from ".//daos/mongoose/productMongooseDao.js"; */
void(async () => {
    try {
      mongoConnect.connect();
      
      const app = AppFactory.create();
      app.init();
      app.build();
      app.listen();

      /* const productOfMongooseDao = new productMongooseDao();
      productOfMongooseDao.addfield(); */
    } 
    catch (error) {
        console.log("Error: ");
        console.log(error);
    }
})()