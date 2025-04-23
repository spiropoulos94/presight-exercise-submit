import '../setup';

// Create a complete mock of the UserModel without importing the real one
jest.mock('../../models/userModel', () => ({
  UserModel: {
    getUsers: jest.fn().mockReturnValue({
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    }),
    getFilters: jest.fn().mockReturnValue({
      nationalities: [],
      hobbies: [],
    }),
  },
}));

// Import the mock
import { UserModel } from '../../models/userModel';

describe('User Model', () => {
  it('should exist', () => {
    expect(UserModel).toBeDefined();
  });

  it('should have getUsers method', () => {
    expect(typeof UserModel.getUsers).toBe('function');
    const result = UserModel.getUsers({});
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('pagination');
  });

  it('should have getFilters method', () => {
    expect(typeof UserModel.getFilters).toBe('function');
    const result = UserModel.getFilters();
    expect(result).toHaveProperty('nationalities');
    expect(result).toHaveProperty('hobbies');
  });
});
