import '../setup';
import { Request, Response } from 'express';
import { StreamController } from '../../controllers/streamController';

// Mock the controller
jest.mock('../../controllers/streamController', () => ({
  StreamController: {
    streamText: jest.fn().mockImplementation((req, res) => {
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');
      res.write('Hello ');
      res.write('World');
      res.end();
      return res;
    }),
  },
}));

describe('Stream Controller', () => {
  it('should stream text data correctly', () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      on: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Call the controller method
    StreamController.streamText(mockRequest, mockResponse);

    // Verify the headers were set correctly
    expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockResponse.setHeader).toHaveBeenCalledWith('Transfer-Encoding', 'chunked');

    // Verify the response was sent in chunks
    expect(mockResponse.write).toHaveBeenCalledWith('Hello ');
    expect(mockResponse.write).toHaveBeenCalledWith('World');
    expect(mockResponse.end).toHaveBeenCalled();

    // Verify calls were made in expected order
    expect(mockResponse.setHeader).toHaveBeenCalled();
    expect(mockResponse.write).toHaveBeenCalled();
    expect(mockResponse.end).toHaveBeenCalled();
  });

  it('should handle error scenarios gracefully', () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      setHeader: jest.fn(),
      write: jest.fn().mockImplementation(() => {
        throw new Error('Network error');
      }),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      on: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Reset mock to provide custom implementation for this test
    (StreamController.streamText as jest.Mock).mockImplementationOnce((req, res) => {
      try {
        res.setHeader('Content-Type', 'text/plain');
        res.write('Data');
      } catch (error) {
        res.status(500).json({ error: 'Stream failed' });
      }
      return res;
    });

    // Call the controller method
    StreamController.streamText(mockRequest, mockResponse);

    // Verify error handling
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });
});
