import { User, FiltersResponse, PaginatedResponse, UsersQueryParams } from 'shared';
import { generateUsers } from '../utils/dataGenerator';
import config from '../config';

// Generate in-memory database of users
const USERS_DB: User[] = generateUsers(config.data.userCount);

/**
 * User model class that handles all user-related data operations
 */
export class UserModel {
  /**
   * Get users with pagination and filtering
   */
  static getUsers(params: UsersQueryParams): PaginatedResponse<User> {
    const { page = 1, limit = 20, search = '', hobbies = [], nationalities = [] } = params;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    // Filter users based on search, hobbies, and nationalities
    let filteredUsers = [...USERS_DB];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchLower) ||
          user.last_name.toLowerCase().includes(searchLower),
      );
    }

    // Apply hobby filter
    if (hobbies.length > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        user.hobbies.some((hobby) => hobbies.includes(hobby)),
      );
    }

    // Apply nationality filter
    if (nationalities.length > 0) {
      filteredUsers = filteredUsers.filter((user) => nationalities.includes(user.nationality));
    }

    // Calculate pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      page: pageNum,
      limit: limitNum,
      total: filteredUsers.length,
    };
  }

  /**
   * Get all filters for the UI
   */
  static getFilters(): FiltersResponse {
    return {
      hobbies: this.getAllHobbies().slice(0, 20), // Top 20 hobbies
      nationalities: this.getAllNationalities(),
    };
  }

  /**
   * Get all unique hobbies from all users
   */
  private static getAllHobbies(): string[] {
    const allHobbies = new Set<string>();
    USERS_DB.forEach((user) => {
      user.hobbies.forEach((hobby) => allHobbies.add(hobby));
    });
    return Array.from(allHobbies);
  }

  /**
   * Get all unique nationalities from all users
   */
  private static getAllNationalities(): string[] {
    return [...new Set(USERS_DB.map((user) => user.nationality))];
  }
}
