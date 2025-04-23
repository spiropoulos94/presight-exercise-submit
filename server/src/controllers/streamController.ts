import { Request, Response } from 'express';
import { StreamService } from '../services/streamService';
import logger from '../utils/logger';

/**
 * Controller for text streaming endpoints
 */
export class StreamController {
  /**
   * Stream text to client one character at a time
   */
  static async streamText(_req: Request, res: Response): Promise<void> {
    try {
      await StreamService.streamText(res);
    } catch (error) {
      logger.error(`Error in streamText controller: ${error}`);
      
      // Only send error response if headers haven't been sent yet
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Failed to stream text',
        });
      }
    }
  }
} 