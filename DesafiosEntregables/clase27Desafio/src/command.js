import { exit } from 'shelljs';
import { program } from 'commander';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import mongoConnect from "./config/mongoAtlasConfig.js"
import AddUser from "./presentation/commands/addUser.js";

void (async() =>{
  try{
    mongoConnect.connect();
    program.addCommand(AddUser);
    await program.parseAsync(process.argv);
    exit();
  }
  catch (error){
      await console.log(error);
      exit();
  }
})();