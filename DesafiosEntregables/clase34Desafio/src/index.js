/* 
***CONSIGNA DESAFIO***
Tests
Consigna
Descripción de la pre entrega: 
  *Generar test de integración de producto. (Endpoints, routes) 
  *Generar el test de todos los endpoints.
  *Generar al menos un test fallido.

Formato
  *Link al repositorio de Github para poder clonar, además. adjunto el archivo .env para poder relacionar las variables de entorno.

*/

import dotenv from "dotenv";
dotenv.config();

import config from "./config/index.js";
import DbFactory from "./data/factories/dbFactory.js";
import AppFactory from "./presentation/factories/appFactory.js";

void(async () => {
    try {
      const db = DbFactory.create(config.db);
      db.init(config.dbUri);

      const app = AppFactory.create();
      app.init();
      app.build();
      app.listen();
    } 
    catch (error) {
        console.log("Error: ");
        console.log(error);
    }
})()