import winston from 'winston';
import config from '../config';

const { combine, timestamp, printf, colorize } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

/**
 * Logger configuration based on environment
 */
const logger = winston.createLogger({
  level: config.server.env === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp(),
    config.server.env === 'production' ? winston.format.json() : colorize(),
    logFormat
  ),
  transports: [
    // Console transport always enabled
    new winston.transports.Console(),
    
    // File transport only in production
    ...(config.server.env === 'production'
      ? [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
  ],
});

export default logger; 