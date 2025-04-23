import { Response } from 'express';
import { generateLongText } from '../utils/dataGenerator';
import logger from '../utils/logger';

/**
 * Service for handling text streaming
 */
export class StreamService {
  /**
   * Stream text to response one character at a time
   */
  static async streamText(res: Response): Promise<void> {
    logger.debug('Starting text stream');
    
    try {
      const longText = generateLongText();
      
      // Set up stream response headers
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');
      
      // Stream text character by character
      for (let i = 0; i < longText.length; i++) {
        // Write a single character
        res.write(longText[i]);
        
        // Small delay to simulate slower streaming
        // We use a promise-based delay to not block the event loop
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      
      // End the response
      res.end();
      
      logger.debug('Text stream completed');
    } catch (error) {
      logger.error(`Error streaming text: ${error}`);
      
      // If headers were not sent yet, send an error response
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error streaming text' });
      } else {
        // Otherwise just end the response
        res.end();
      }
    }
  }
} 