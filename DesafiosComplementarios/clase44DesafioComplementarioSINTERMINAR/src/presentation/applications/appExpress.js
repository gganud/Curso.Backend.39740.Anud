import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUiExpress from 'swagger-ui-express';

import config from '../../config/index.js';
import { specs, options } from '../../config/swaggerConfig.js';

import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import userRouter from '../routes/userRouter.js';
import sessionRouter from '../routes/sessionRouter.js';
import roleRouter from '../routes/roleRouter.js';
import loggerTestRouter from '../routes/loggerTestRouter.js';

import { logger } from '../middlewares/logger.js';
import errorHandler from '../middlewares/errorHandler.js';
import pinoLogger from '../../config/pinoLoggerConfig.js';

class AppExpress
{
init()
{
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
      }

      build()
{
        // Logger
        this.app.use(logger);
        // Routes
        this.app.use('/api/carts', cartRouter);
        this.app.use('/api/products', productRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/sessions', sessionRouter);
        this.app.use('/api/roles', roleRouter);

        // Logger test endpoint
        this.app.use('/api/loggertest', loggerTestRouter);

        // Docs
        this.app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs, options));
        // ErrorHandler
        this.app.use(errorHandler);
    }

    callback()
{
        return this.app;
    }

    close()
{
        this.server.close();
    }

    listen()
{
      this.server = this.app.listen(config.port, () =>
{
        pinoLogger.info(`Server listening on port ${config.port}`);
      });
      return this.server;
    }
}

export default AppExpress;
