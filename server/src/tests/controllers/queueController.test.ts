import '../setup';
import { Request, Response } from 'express';
import { QueueController } from '../../controllers/queueController';
import { StatusCodes } from 'http-status-codes';

// Mock QueueService
jest.mock('../../services/queueService', () => ({
  QueueService: {
    processRequest: jest.fn().mockReturnValue({
      requestId: 'test-id-123',
      status: 'pending',
    }),
    cancelAllRequests: jest.fn(),
  },
}));

describe('Queue Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonData: any;

  beforeEach(() => {
    jsonData = {};
    mockRequest = {
      body: { data: 'test-data' },
    };
    mockResponse = {
      json: jest.fn().mockImplementation((data) => {
        jsonData = data;
        return mockResponse;
      }),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should process a request and return accepted status', () => {
    QueueController.processRequest(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
    expect(jsonData).toHaveProperty('requestId', 'test-id-123');
    expect(jsonData).toHaveProperty('status', 'pending');
  });

  it('should handle errors in processing requests', () => {
    const { QueueService } = jest.requireMock('../../services/queueService');
    QueueService.processRequest.mockImplementationOnce(() => {
      throw new Error('Queue error');
    });

    QueueController.processRequest(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(jsonData).toHaveProperty('error', 'Failed to process request');
  });

  it('should cancel all requests', () => {
    QueueController.cancelAllRequests(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonData).toHaveProperty('message', 'All pending requests have been cancelled');
  });
});
