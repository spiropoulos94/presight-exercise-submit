import '../setup';
import { QueueModel } from '../../models/queueModel';

// Mock timeout to control async behavior
jest.useFakeTimers();

// Mock data generator
jest.mock('../../utils/dataGenerator', () => ({
  generateQueueResult: jest.fn().mockReturnValue('processed result'),
}));

describe('Queue Model', () => {
  let mockCallback: jest.Mock;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Set up callback mock
    mockCallback = jest.fn();
    QueueModel.setProcessCallback(mockCallback);

    // Clear any existing queue
    QueueModel.cancelAll();
  });

  it('should have the expected methods', () => {
    expect(QueueModel).toBeDefined();
    expect(typeof QueueModel.enqueue).toBe('function');
    expect(typeof QueueModel.cancelAll).toBe('function');
    expect(typeof QueueModel.setProcessCallback).toBe('function');
  });

  it('should cancel all pending requests', () => {
    // Call cancelAll and verify it doesn't throw
    expect(() => {
      QueueModel.cancelAll();
    }).not.toThrow();
  });
});
