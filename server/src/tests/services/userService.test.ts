import '../setup';
import { UserService } from '../../services/userService';
import { UserModel } from '../../models/userModel';

// Create mock data to match the structure in the setup mock
const mockUserData = {
  data: [
    {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      age: 30,
      nationality: 'US',
      avatar: 'avatar.jpg',
      hobbies: ['Reading', 'Gaming'],
    },
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
  },
};

const mockFilters = {
  nationalities: ['US', 'UK'],
  hobbies: ['Reading', 'Gaming'],
};

// Mock UserModel
jest.mock('../../models/userModel', () => ({
  UserModel: {
    getUsers: jest.fn().mockReturnValue(mockUserData),
    getFilters: jest.fn().mockReturnValue(mockFilters),
  },
}));

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get users with default params', () => {
    const result = UserService.getUsers({});
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('pagination');
  });

  it('should get filters', () => {
    const filters = UserService.getFilters();
    expect(filters).toHaveProperty('nationalities');
    expect(filters).toHaveProperty('hobbies');
  });

  it('should exist and have required methods', () => {
    expect(UserService).toBeDefined();
    expect(typeof UserService.getUsers).toBe('function');
    expect(typeof UserService.getFilters).toBe('function');
  });
});
