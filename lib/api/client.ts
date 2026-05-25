import axios, { AxiosError, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Only log real errors, not expected offline/network issues
    if (error.code !== 'ECONNREFUSED' && error.code !== 'ERR_NETWORK') {
      if (error.response) {
        console.error(`[API Error] ${error.response.status}: ${error.response.data}`);
      } else {
        console.error('[API Error]', error.message);
      }
    }
    return Promise.reject(error);
  }
);

// Generic API response type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  count?: number;
}

// Error handler utility
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      return 'Unable to connect to server. Please try again later.';
    }
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Check if API is available
export const isApiAvailable = async (): Promise<boolean> => {
  try {
    await api.get('/health', { timeout: 3000 });
    return true;
  } catch {
    console.warn('[API] Health check failed - backend not available');
    return false;
  }
};

export { api, API_BASE_URL };
export type { ApiResponse };
