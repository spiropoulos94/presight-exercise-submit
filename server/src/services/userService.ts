import { FiltersResponse, PaginatedResponse, User, UsersQueryParams } from 'shared';
import { UserModel } from '../models/userModel';
import logger from '../utils/logger';

/**
 * Service layer for user-related operations
 */
export class UserService {
  /**
   * Get users with pagination and filtering
   */
  static getUsers(params: UsersQueryParams): PaginatedResponse<User> {
    logger.debug(`Fetching users with params: ${JSON.stringify(params)}`);

    try {
      return UserModel.getUsers(params);
    } catch (error) {
      logger.error(`Error fetching users: ${error}`);
      throw error;
    }
  }

  /**
   * Get filters for UI
   */
  static getFilters(): FiltersResponse {
    logger.debug('Fetching filters for UI');

    try {
      return UserModel.getFilters();
    } catch (error) {
      logger.error(`Error fetching filters: ${error}`);
      throw error;
    }
  }
}
