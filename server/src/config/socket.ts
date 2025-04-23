import { Server, ServerOptions } from 'socket.io';
import { Server as HttpServer } from 'http';
import { QueueService } from '../services/queueService';
import { SocketEvents } from 'shared';
import config from './index';
import logger from '../utils/logger';

/**
 * Configure and initialize Socket.io
 */
export const initializeSocket = (httpServer: HttpServer): Server => {
  // Socket.io options
  const options = {
    cors: {
      origin: config.server.corsOrigin,
      methods: ['GET', 'POST'],
    },
  };

  // Create socket.io server
  const io = new Server(httpServer, options);

  // Socket.io connection handler
  io.on(SocketEvents.CONNECTION, (socket: any) => {
    logger.info(`Client connected: ${socket.id}`);

    // Handle disconnection
    socket.on(SocketEvents.DISCONNECT, () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  // Initialize queue service with socket.io
  QueueService.initialize(io);

  return io;
};
