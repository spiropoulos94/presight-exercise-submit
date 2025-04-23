import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import {
  User,
  UserFilters,
  FiltersResponse,
  ApiResponse,
  StreamingTextResponse,
  QueueResult as QueueItem,
  QueueResponse,
} from 'shared';

// API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Socket.io instance
export const socket: Socket = io(API_URL);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors or unexpected server errors
    if (!error.response) {
      console.error('Network error or server not responding');
    }
    return Promise.reject(error);
  },
);

// Users API
export const getUsersApi = async (
  page = 1,
  limit = 20,
  filters?: UserFilters,
): Promise<ApiResponse<User[]>> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (filters?.search) params.append('search', filters.search);
  if (filters?.hobbies?.length) params.append('hobbies', filters.hobbies.join(','));
  if (filters?.nationalities?.length)
    params.append('nationalities', filters.nationalities.join(','));

  const response = await api.get(`/api/users?${params.toString()}`);
  return response.data;
};

// Filters API
export const getFiltersApi = async (): Promise<FiltersResponse> => {
  const response = await api.get('/api/users/filters');
  return response.data;
};

// Get streaming text URL for direct fetch (useful for streaming responses)
export const getStreamTextUrl = (): string => {
  return `${API_URL}/api/stream-text`;
};

/**
 * Fetches streaming text using the Fetch API
 * @param onChunk Callback function that receives text as it arrives
 * @param signal AbortController signal for cancellation
 * @returns Promise that resolves when streaming is complete
 */
export const fetchStreamingText = async (
  onChunk: (text: string, isComplete: boolean) => void,
  signal?: AbortSignal,
): Promise<void> => {
  const response = await fetch(getStreamTextUrl(), { signal });

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
  }

  // Get the reader from the response body stream
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let receivedText = '';

  // Read the stream
  let isStreamDone = false;
  while (!isStreamDone) {
    const { done, value } = await reader.read();

    if (done) {
      onChunk(receivedText, true);
      isStreamDone = true;
      break;
    }

    // Decode the received chunk and add it character by character
    const chunk = decoder.decode(value, { stream: true });
    receivedText += chunk;
    onChunk(receivedText, false);
  }
};

// Process request API
export const processRequestApi = async (): Promise<QueueResponse> => {
  const response = await api.post('/api/process-request');
  return response.data;
};

// Cancel all pending requests API
export const cancelAllRequestsApi = async (): Promise<void> => {
  await api.post('/api/process-request/cancel-all');
};

export default api;
