import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services/userService';
import logger from '../utils/logger';

/**
 * Controller for user-related endpoints
 */
export class UserController {
  /**
   * Get paginated users with filtering
   */
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      // Parse query parameters
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const search = req.query.search as string | undefined;

      // Parse hobbies and nationalities from query strings
      const hobbies = req.query.hobbies ? (req.query.hobbies as string).split(',') : [];

      const nationalities = req.query.nationalities
        ? (req.query.nationalities as string).split(',')
        : [];

      // Get users from service
      const result = UserService.getUsers({
        page,
        limit,
        search,
        hobbies,
        nationalities,
      });

      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      logger.error(`Error in getUsers controller: ${error}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to fetch users',
      });
    }
  }

  /**
   * Get filters for UI
   */
  static async getFilters(_req: Request, res: Response): Promise<void> {
    try {
      const filters = UserService.getFilters();

      res.status(StatusCodes.OK).json(filters);
    } catch (error) {
      logger.error(`Error in getFilters controller: ${error}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to fetch filters',
      });
    }
  }
}
