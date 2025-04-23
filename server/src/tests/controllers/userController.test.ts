// Import the setup first to ensure mocks are applied
import '../setup';
import { Request, Response } from 'express';
import { UserController } from '../../controllers/userController';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../services/userService';

// Mock UserService
jest.mock('../../services/userService', () => ({
  UserService: {
    getUsers: jest.fn().mockReturnValue({
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
      page: 1,
      limit: 20,
      total: 1,
    }),
    getFilters: jest.fn().mockReturnValue({
      nationalities: ['US', 'UK'],
      hobbies: ['Reading', 'Gaming'],
    }),
  },
}));

describe('User Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonData: any;

  beforeEach(() => {
    jsonData = {};
    mockRequest = { query: {} };
    mockResponse = {
      json: jest.fn().mockImplementation((data) => {
        jsonData = data;
        return mockResponse;
      }),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return paginated users', async () => {
    mockRequest.query = { page: '1', limit: '20' };

    await UserController.getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonData).toHaveProperty('data');
    expect(jsonData.data.length).toBe(1);
    expect(jsonData).toHaveProperty('page', 1);
  });

  it('should handle filtering by nationalities', async () => {
    mockRequest.query = { nationalities: 'US,UK' };

    await UserController.getUsers(mockRequest as Request, mockResponse as Response);

    expect(UserService.getUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        nationalities: ['US', 'UK'],
      }),
    );
  });

  it('should return filters', async () => {
    await UserController.getFilters(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonData).toHaveProperty('nationalities');
    expect(jsonData).toHaveProperty('hobbies');
  });

  it('should handle errors in getUsers', async () => {
    (UserService.getUsers as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    await UserController.getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(jsonData).toHaveProperty('error', 'Failed to fetch users');
  });
});
