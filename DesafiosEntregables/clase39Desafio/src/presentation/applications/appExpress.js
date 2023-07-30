import express from 'express';
import cookieParser from "cookie-parser";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import config from '../../config/index.js';

import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import userRouter from "../routes/userRouter.js";
import sessionRouter from "../routes/sessionRouter.js";
import roleRouter from "../routes/roleRouter.js";

import logger from '../middlewares/logger.js';
import errorHandler from '../middlewares/errorHandler.js';
import { log } from 'console';

class AppExpress{
init(){
        this.app = express();
        const swaggerOptions = {
            definition: {
                openapi: '3.0.1',
                info: {
                    title: 'Ecommerce Api Documentation',
                    description: "Api Documentation with Swagger",
                    contact: {
                        name: "Gastón Anud",
                        url: "https://github.com/gganud/Curso.Backend.39740.Anud",
                        email: "gastonanud@gmail.com",
                    }
                }
            },
            apis: ['./docs/**/*.yaml']
        };
        const specs = swaggerJsdoc(swaggerOptions)
        this.app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser());
        this.app.use(logger);
    }

    build(){
        this.app.use('/api/carts', cartRouter);
        this.app.use('/api/products', productRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/sessions', sessionRouter);
        this.app.use('/api/roles', roleRouter);
        this.app.use(errorHandler);
    }
    
    callback(){
        return this.app;
    }

    close(){
        this.server.close();
    }

    listen(){
      this.server = this.app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);
      });
      return this.server;
    }
}

export default AppExpress;