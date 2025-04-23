import { config } from '../config';

// Mock config before any imports are loaded
jest.mock('../config', () => {
  const mockConfig = {
    server: {
      port: 3001,
      env: 'test',
      corsOrigin: 'http://localhost:3000',
    },
    data: {
      userCount: 100,
    },
    queue: {
      processingTime: 100,
    },
  };

  return {
    __esModule: true,
    default: mockConfig,
    config: mockConfig,
  };
});

// Mock logger to avoid console output during tests
jest.mock('../utils/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock user service
jest.mock('../services/userService', () => ({
  UserService: {
    getUsers: jest.fn().mockReturnValue({
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    }),
    getFilters: jest.fn().mockReturnValue({
      nationalities: [],
      hobbies: [],
    }),
  },
}));
