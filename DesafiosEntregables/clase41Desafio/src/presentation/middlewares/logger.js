import pinoLogger from "../../config/pinoLogger.js";

export const logger = (req, res, next) => {
  req.logger = pinoLogger
  pinoLogger.debug(`${req.method} en ${req.url}`)
  next();
  }
