/* 
***CONSIGNA DESAFIO***
Implementación de logger

Consigna
  *Basado en nuestro proyecto principal, implementar un logger.

Aspectos a incluir
  *Primero, definir un sistema de niveles que tenga la siguiente prioridad (de menor a mayor): debug, http, info, warning, error, fatal
  *Después implementar un logger para desarrollo y un logger para producción, el logger de desarrollo deberá loggear a partir del nivel debug, sólo en consola
  *Sin embargo, el logger del entorno productivo debería loggear sólo a partir de nivel info.
  *Además, el logger deberá enviar en un transporte de archivos a partir del nivel de error en un nombre “errors.log”
  *Agregar logs de valor alto en los puntos importantes de tu servidor (errores, advertencias, etc) y modificar los console.log() habituales que tenemos para que muestren todo a partir de winston.
  *Crear un endpoint /loggerTest que permita probar todos los logs


Formato
  *link al repositorio de Github con el proyecto sin node_modules, además. adjunto el archivo .env para poder relacionar las variables de entorno.

Sugerencias
  *Puedes revisar el testing del entregable Aquí.
  *La ruta loggerTest es muy importante para que tu entrega pueda ser calificada de manera rápida y eficiente. ¡No olvides colocarla!
*/

import dotenv from "dotenv";
dotenv.config();

import config from "./config/index.js";
import pinoLogger from "./config/pinoLogger.js";
import DbFactory from "./data/factories/dbFactory.js";
import AppFactory from "./presentation/factories/appFactory.js";

void(async () => {
    try {
      const db = DbFactory.create();
      db.init(config.dbUri);

      const app = AppFactory.create();
      app.init();
      app.build();
      app.listen();
    } 
    catch (err) {
      pinoLogger.error(err.stack);
    }
})()