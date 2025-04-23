import { Server } from 'socket.io';
import { QueueModel } from '../models/queueModel';
import { QueueRequest, QueueResponse, SocketEvents } from 'shared';
import logger from '../utils/logger';

/**
 * Service for handling queue operations
 */
export class QueueService {
  private static io: Server;

  /**
   * Initialize the queue service with socket.io
   */
  static initialize(socketIo: Server): void {
    this.io = socketIo;

    // Set up callback for processed queue items
    QueueModel.setProcessCallback((result) => {
      logger.debug(`Emitting result for request ${result.requestId}`);
      this.io.emit(SocketEvents.REQUEST_COMPLETE, result);
    });

    logger.info('Queue service initialized');
  }

  /**
   * Process a new request
   */
  static processRequest(data: unknown): QueueResponse {
    const requestId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 5);

    logger.debug(`Enqueueing new request with ID: ${requestId}`);

    // Create queue request
    const request: QueueRequest = {
      id: requestId,
      data,
      timestamp: new Date().toISOString(),
    };

    // Add to queue and start processing
    QueueModel.enqueue(request);

    return {
      requestId,
      status: 'pending',
    };
  }

  /**
   * Cancel all pending requests in the queue
   */
  static cancelAllRequests(): void {
    logger.info('Cancelling all pending requests');

    // Clear the queue
    QueueModel.cancelAll();

    // Emit event to all clients that queue was cleared
    if (this.io) {
      this.io.emit(SocketEvents.QUEUE_CLEARED, { timestamp: new Date().toISOString() });
    }
  }
}
