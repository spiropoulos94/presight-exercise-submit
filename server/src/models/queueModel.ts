import { QueueRequest, QueueResult } from 'shared';
import { generateQueueResult } from '../utils/dataGenerator';
import config from '../config';
import logger from '../utils/logger';

/**
 * Queue model for handling request queues
 */
export class QueueModel {
  // In-memory queue storage
  private static requestQueue: QueueRequest[] = [];
  private static isProcessing = false;
  private static processCallback: (result: QueueResult) => void = () => {};

  /**
   * Add a request to the queue
   */
  static enqueue(request: QueueRequest): string {
    // Add to queue
    this.requestQueue.push(request);

    // Start processing if not already
    if (!this.isProcessing) {
      this.processQueue();
    }

    return request.id;
  }

  /**
   * Set the callback for when a request is processed
   */
  static setProcessCallback(callback: (result: QueueResult) => void): void {
    this.processCallback = callback;
  }

  /**
   * Clear all pending requests in the queue
   */
  static cancelAll(): void {
    logger.info(`Cancelling all pending requests. Queue size was: ${this.requestQueue.length}`);
    this.requestQueue = [];
    // We don't set isProcessing to false here because there might be a request
    // currently being processed outside the queue
  }

  /**
   * Process the queue in a "worker" fashion
   */
  private static processQueue(): void {
    if (this.requestQueue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const request = this.requestQueue.shift();

    if (!request) {
      this.isProcessing = false;
      return;
    }

    logger.debug(`Processing request ${request.id}`);

    // Simulate processing delay
    setTimeout(() => {
      // Generate result
      const result: QueueResult = {
        requestId: request.id,
        result: generateQueueResult(request.id),
        timestamp: new Date().toISOString(),
      };

      // Send result via callback
      this.processCallback(result);

      // Process next item
      this.processQueue();
    }, Number(config.queue.processingTime));
  }
}
