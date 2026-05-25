import { api, handleApiError, ApiResponse } from './client';
import { fallbackToppers } from './fallback-data';

export interface Topper {
  _id: string;
  name: string;
  percentage: string;
  rank: number;
  image: string;
  year: string;
  subjects?: { name: string; score: number }[];
  attendanceRecord?: string;
  batch?: string;
  isActive?: boolean;
}

interface ToppersParams {
  year?: string;
  limit?: number;
}

// Get all toppers with optional filters
export const getToppers = async (params?: ToppersParams): Promise<{ data: Topper[]; error: string | null; isOffline: boolean }> => {
  try {
    const response = await api.get<ApiResponse<Topper[]>>('/toppers', { params });
    return { 
      data: response.data.data, 
      error: null,
      isOffline: false
    };
  } catch (error: unknown) {
    const axios = await import('axios');
    const isNetworkError = axios.default.isAxiosError(error) && 
      (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK');
    
    if (!isNetworkError) {
      console.error('[Toppers Service] Failed to fetch toppers:', handleApiError(error));
    }
    
    // Return fallback data with filter applied
    let filteredData = fallbackToppers;
    if (params?.year && params.year !== 'All-Time Records') {
      filteredData = fallbackToppers.filter(t => t.year === params.year);
    }
    if (params?.limit) {
      filteredData = filteredData.slice(0, params.limit);
    }
    return { 
      data: filteredData, 
      error: null,
      isOffline: true
    };
  }
};

// Get single topper by ID
export const getTopperById = async (id: string): Promise<{ data: Topper | null; error: string | null }> => {
  try {
    const response = await api.get<ApiResponse<Topper>>(`/toppers/${id}`);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('[Toppers Service] Failed to fetch topper:', handleApiError(error));
    const fallback = fallbackToppers.find(t => t._id === id) || null;
    return { data: fallback, error: handleApiError(error) };
  }
};

// Create new topper (admin)
export const createTopper = async (topperData: Partial<Topper>): Promise<{ data: Topper | null; error: string | null }> => {
  try {
    const response = await api.post<ApiResponse<Topper>>('/toppers', topperData);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('[Toppers Service] Failed to create topper:', handleApiError(error));
    return { data: null, error: handleApiError(error) };
  }
};

// Update topper (admin)
export const updateTopper = async (id: string, topperData: Partial<Topper>): Promise<{ data: Topper | null; error: string | null }> => {
  try {
    const response = await api.put<ApiResponse<Topper>>(`/toppers/${id}`, topperData);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('[Toppers Service] Failed to update topper:', handleApiError(error));
    return { data: null, error: handleApiError(error) };
  }
};

// Delete topper (admin)
export const deleteTopper = async (id: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    await api.delete(`/toppers/${id}`);
    return { success: true, error: null };
  } catch (error) {
    console.error('[Toppers Service] Failed to delete topper:', handleApiError(error));
    return { success: false, error: handleApiError(error) };
  }
};
