/* 
***CONSIGNA DESAFIO***
Tests
Consigna
Descripción de la pre entrega: 
  *Replicar lo que se hizo en clases.
  *Agregar los test de update, delete y getOne.
  *Agregar mas expect en la paginacion.
  *Agregar un roles.test.js con todos los test del RoleRepository.

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