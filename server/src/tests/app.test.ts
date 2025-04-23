// Import the setup first to ensure mocks are applied
import './setup';
import request from 'supertest';
import { createApp } from '../app';

// Get the actual Express app
const app = createApp();

describe('App', () => {
  it('should return 200 OK for health check endpoint', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });

  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
  });
});
