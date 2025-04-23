import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Server configuration
 */
export const config = {
  server: {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  data: {
    // Number of users to generate in the in-memory database
    userCount: process.env.USER_COUNT || 1000,
  },
  queue: {
    // Simulated processing time in milliseconds
    processingTime: process.env.PROCESSING_TIME || 2000,
  },
};

export default config;
