import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../utils/logger';

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong';
  
  logger.error(`Error: ${err.stack}`);
  
  res.status(status).json({
    error: {
      message,
      status,
    },
  });
}; 