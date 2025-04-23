import '../setup';
import { QueueService } from '../../services/queueService';
import { SocketEvents } from 'shared';

// Mock socket.io
const mockEmit = jest.fn();
const mockSocketIo = {
  emit: mockEmit,
};

// Mock QueueModel
jest.mock('../../models/queueModel', () => ({
  QueueModel: {
    enqueue: jest.fn().mockImplementation((request) => request.id),
    setProcessCallback: jest.fn(),
    cancelAll: jest.fn(),
  },
}));

describe('Queue Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Initialize service with mock socket
    QueueService.initialize(mockSocketIo as any);
  });

  it('should process a request and return a response with ID', () => {
    // Mock Date.now for consistent IDs in tests
    const originalDateNow = Date.now;
    const mockTimestamp = 1625097600000; // 2021-07-01T00:00:00.000Z
    Date.now = jest.fn().mockReturnValue(mockTimestamp);

    const testData = { message: 'test data' };
    const response = QueueService.processRequest(testData);

    // Restore original Date.now
    Date.now = originalDateNow;

    expect(response).toHaveProperty('requestId');
    expect(response.requestId.startsWith(mockTimestamp.toString())).toBeTruthy();
    expect(response).toHaveProperty('status', 'pending');

    // Verify that the request was enqueued
    const { QueueModel } = require('../../models/queueModel');
    expect(QueueModel.enqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        data: testData,
      }),
    );
  });

  it('should cancel all requests and emit an event', () => {
    QueueService.cancelAllRequests();

    // Verify the queue was cleared
    const { QueueModel } = require('../../models/queueModel');
    expect(QueueModel.cancelAll).toHaveBeenCalled();

    // Verify an event was emitted
    expect(mockEmit).toHaveBeenCalledWith(
      SocketEvents.QUEUE_CLEARED,
      expect.objectContaining({
        timestamp: expect.any(String),
      }),
    );
  });

  it('should set up a callback for processed items', () => {
    // Get the callback that was registered
    const { QueueModel } = require('../../models/queueModel');
    const callback = QueueModel.setProcessCallback.mock.calls[0][0];

    // Call the callback with a result
    const mockResult = {
      requestId: 'test-id',
      result: 'processed',
      timestamp: '2023-01-01T00:00:00.000Z',
    };
    callback(mockResult);

    // Verify the result was emitted via socket
    expect(mockEmit).toHaveBeenCalledWith(SocketEvents.REQUEST_COMPLETE, mockResult);
  });
});
