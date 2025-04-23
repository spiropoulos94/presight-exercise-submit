import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * Middleware to log all incoming requests
 */
export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { method, url, body, query } = req;
  
  logger.debug(`${method} ${url}`, {
    query: Object.keys(query).length ? query : undefined,
    body: Object.keys(body || {}).length ? body : undefined,
  });
  
  next();
}; 