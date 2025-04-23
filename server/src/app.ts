import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import routes from './routes';
import { errorHandler, requestLogger } from './middleware';

/**
 * Create and configure the Express application
 */
export const createApp = (): Express => {
  // Create Express app
  const app = express();

  // Basic middleware
  app.use(helmet());
  app.use(
    cors({
      origin: config.server.corsOrigin,
    }),
  );

  // Request logging
  if (config.server.env === 'development') {
    app.use(morgan('dev'));
  }

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Custom request logger
  app.use(requestLogger);

  // API routes
  app.use(routes);

  // Health check route
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  // Global error handler
  app.use(errorHandler);

  return app;
};
