import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QueueService } from '../services/queueService';
import logger from '../utils/logger';

/**
 * Controller for request queue endpoints
 */
export class QueueController {
  /**
   * Process a request in the background
   */
  static processRequest(req: Request, res: Response): void {
    try {
      // Process the request in the background
      const result = QueueService.processRequest(req.body);

      // Immediately return with the request ID
      res.status(StatusCodes.ACCEPTED).json(result);
    } catch (error) {
      logger.error(`Error in processRequest controller: ${error}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to process request',
      });
    }
  }

  /**
   * Cancel all pending requests
   */
  static cancelAllRequests(req: Request, res: Response): void {
    try {
      // Cancel all pending requests
      QueueService.cancelAllRequests();

      // Return success
      res.status(StatusCodes.OK).json({
        message: 'All pending requests have been cancelled',
      });
    } catch (error) {
      logger.error(`Error in cancelAllRequests controller: ${error}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to cancel requests',
      });
    }
  }
}
