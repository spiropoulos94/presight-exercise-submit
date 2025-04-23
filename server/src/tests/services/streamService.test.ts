import '../setup';
import { StreamService } from '../../services/streamService';

describe('Stream Service', () => {
  it('should exist', () => {
    expect(StreamService).toBeDefined();
    expect(typeof StreamService.streamText).toBe('function');
  });
});
