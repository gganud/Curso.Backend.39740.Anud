import { exit } from 'shelljs';
import { program } from 'commander';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import config from "./config/index.js";
import pinoLogger from './config/pinoLogger.js';
import DbFactory from "./data/factories/dbFactory.js";
import AddUser from "./presentation/commands/addUser.js";

void (async() =>{
  try{
    const db = DbFactory.create(config.db);
    db.init(config.dbUri);

    program.addCommand(AddUser);
    await program.parseAsync(process.argv);
    exit();
  }
  catch (err){
      await pinoLogger.error(err.stack);
      exit();
  }
})();