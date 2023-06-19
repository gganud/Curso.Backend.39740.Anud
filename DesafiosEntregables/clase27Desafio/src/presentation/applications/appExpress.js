import express from 'express';
import cookieParser from "cookie-parser";

import config from '../../config/index.js';

import cartRouter from '../routes/CartRouter.js';
import productRouter from '../routes/productRouter.js';
import userRouter from "../routes/userRouter.js";
import sessionRouter from "../routes/sessionRouter.js";
import roleRouter from "../routes/roleRouter.js";

import logger from '../middlewares/logger.js';
import errorHandler from '../middlewares/errorHandler.js';

class AppExpress{
    init(){
        this.app = express();
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

    listen(){
      return this.app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);
      });
    }
}

export default AppExpress;