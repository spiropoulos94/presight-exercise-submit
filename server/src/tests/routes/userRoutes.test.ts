import '../setup';
import request from 'supertest';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

// Mock UserController
const mockGetUsers = jest.fn().mockImplementation((req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const search = req.query.search as string | undefined;
  const nationalities = req.query.nationalities
    ? (req.query.nationalities as string).split(',')
    : [];
  const hobbies = req.query.hobbies ? (req.query.hobbies as string).split(',') : [];

  res.status(StatusCodes.OK).json({
    data: [
      {
        id: '1',
        avatar: 'https://example.com/avatar.jpg',
        first_name: 'John',
        last_name: 'Doe',
        age: 30,
        nationality: nationalities[0] || 'US',
        hobbies: hobbies.length ? hobbies : ['Reading', 'Gaming'],
      },
    ],
    pagination: {
      total: 1,
      page,
      limit,
      totalPages: 1,
    },
  });
});

const mockGetFilters = jest.fn().mockImplementation((req, res) => {
  res.status(StatusCodes.OK).json({
    nationalities: ['US', 'UK', 'CA'],
    hobbies: ['Reading', 'Gaming', 'Swimming'],
  });
});

// Mock UserController
jest.mock('../../controllers/userController', () => ({
  UserController: {
    getUsers: mockGetUsers,
    getFilters: mockGetFilters,
  },
}));

// Set up Express app with routes
const app = express();
import userRoutes from '../../routes/userRoutes';
app.use('/api/users', userRoutes);

describe('User API Routes', () => {
  beforeEach(() => {
    mockGetUsers.mockClear();
    mockGetFilters.mockClear();
  });

  it('GET /api/users should return paginated users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('pagination');
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  it('GET /api/users should accept pagination params', async () => {
    const response = await request(app).get('/api/users').query({ page: 2, limit: 10 });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.pagination.page).toBe(2);
    expect(response.body.pagination.limit).toBe(10);
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  it('GET /api/users should accept filtering params', async () => {
    const response = await request(app).get('/api/users').query({
      nationalities: 'UK',
      hobbies: 'Reading,Gaming',
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data[0].nationality).toBe('UK');
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  it('GET /api/users/filters should return available filters', async () => {
    const response = await request(app).get('/api/users/filters');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('nationalities');
    expect(response.body).toHaveProperty('hobbies');
    expect(mockGetFilters).toHaveBeenCalledTimes(1);
  });
});
