// User related types
export interface User {
  id: string | number;
  first_name: string;
  last_name: string;
  email?: string;
  age: number;
  avatar: string;
  nationality: string;
  hobbies: string[];
  created_at?: string;
}

// API response interfaces
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  page?: number;
  limit?: number;
  total?: number;
}

// Query parameters and pagination
export interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  hobbies?: string[];
  nationalities?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

// Filters interfaces
export interface FiltersResponse {
  hobbies: string[];
  nationalities: string[];
}

export interface UserFilters {
  hobbies?: string[];
  nationalities?: string[];
  search?: string;
}

// Queue related types
export interface QueueRequest {
  id: string;
  requestId?: string;
  status?: 'pending';
  data?: unknown;
  timestamp?: string;
}

export interface QueueResponse {
  requestId: string;
  status: 'pending';
}

export interface QueueResult {
  requestId: string;
  result: string;
  timestamp: string;
}

// Socket events
export enum SocketEvents {
  REQUEST_COMPLETE = 'request-complete',
  QUEUE_CLEARED = 'queue-cleared',
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
}

// UI related types
export interface RequestItem {
  id: number;
  status: 'idle' | 'pending' | 'complete';
  result: string | null;
  requestId: string | null;
  error?: string;
}

// Streaming text interfaces
export interface StreamingTextResponse {
  text: string;
}
