import http from 'http';
import { createApp } from './app';
import { initializeSocket } from './config/socket';
import config from './config';
import logger from './utils/logger';

// Create Express app
const app = createApp();

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io
initializeSocket(server);

// Start server
server.listen(config.server.port, () => {
  logger.info(`Server running on port ${config.server.port} in ${config.server.env} mode`);
  logger.info(`API available at http://localhost:${config.server.port}`);
}); 