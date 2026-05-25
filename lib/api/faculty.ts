import { api, handleApiError, ApiResponse } from './client';
import { fallbackFaculty } from './fallback-data';

export interface Faculty {
  _id: string;
  name: string;
  role: string;
  subject: string;
  image: string;
  experience: string;
  description?: string;
  qualifications?: string[];
  isOwner: boolean;
  order: number;
  isActive?: boolean;
}

// Get all faculty members
export const getFaculty = async (): Promise<{ data: Faculty[]; error: string | null; isOffline: boolean }> => {
  try {
    const response = await api.get<ApiResponse<Faculty[]>>('/faculty');
    return { 
      data: response.data.data, 
      error: null,
      isOffline: false
    };
  } catch (error) {
    console.error('[Faculty Service] Failed to fetch faculty:', handleApiError(error));
    return { 
      data: fallbackFaculty, 
      error: handleApiError(error),
      isOffline: true
    };
  }
};

// Get single faculty member
export const getFacultyById = async (id: string): Promise<{ data: Faculty | null; error: string | null }> => {
  try {
    const response = await api.get<ApiResponse<Faculty>>(`/faculty/${id}`);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('[Faculty Service] Failed to fetch faculty member:', handleApiError(error));
    const fallback = fallbackFaculty.find(f => f._id === id) || null;
    return { data: fallback, error: handleApiError(error) };
  }
};

// Create faculty member (admin)
export const createFaculty = async (facultyData: Partial<Faculty>): Promise<{ data: Faculty | null; error: string | null }> => {
  try {
    const response = await api.post<ApiResponse<Faculty>>('/faculty', facultyData);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('[Faculty Service] Failed to create faculty:', handleApiError(error));
    return { data: null, error: handleApiError(error) };
  }
};

// Update faculty member (admin)
export const updateFaculty = async (id: string, facultyData: Partial<Faculty>): Promise<{ data: Faculty | null; error: string | null }> => {
  try {
    const response = await api.put<ApiResponse<Faculty>>(`/faculty/${id}`, facultyData);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('[Faculty Service] Failed to update faculty:', handleApiError(error));
    return { data: null, error: handleApiError(error) };
  }
};

// Delete faculty member (admin)
export const deleteFaculty = async (id: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    await api.delete(`/faculty/${id}`);
    return { success: true, error: null };
  } catch (error) {
    console.error('[Faculty Service] Failed to delete faculty:', handleApiError(error));
    return { success: false, error: handleApiError(error) };
  }
};
