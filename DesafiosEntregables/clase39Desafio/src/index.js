/* 
***CONSIGNA DESAFIO***
Documentar API

Consigna
  *Realizar la configuración necesaria para tener documentado tu proyecto final a partir de Swagger.

Aspectos a incluir
  *Se debe tener documentado el módulo de productos.
  *Se debe tener documentado el módulo de carrito.
  *No realizar documentación de sesiones.

Formato
  *Link al repositorio de Github para poder clonar, además. adjunto el archivo .env para poder relacionar las variables de entorno.

Sugerencias
  *Recuerda que es un proceso de documentación, ¡Hay que ser lo más claros posibles!
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