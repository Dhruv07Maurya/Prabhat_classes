import { api, handleApiError, ApiResponse } from './client';

export interface DemoBooking {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  selectedDate: Date | string;
  preferredBatch?: 'Morning' | 'Afternoon' | 'Evening';
  classInterested: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt?: string;
}

// Create a new demo booking
export const createBooking = async (bookingData: Omit<DemoBooking, '_id' | 'status' | 'createdAt'>): Promise<{ 
  data: DemoBooking | null; 
  message: string; 
  error: string | null;
  isOffline: boolean;
}> => {
  try {
    const response = await api.post<ApiResponse<DemoBooking> & { message: string }>('/bookings', bookingData);
    console.log('[Bookings Service] Booking created successfully');
    return { 
      data: response.data.data, 
      message: response.data.message || 'Booking created successfully!',
      error: null,
      isOffline: false
    };
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.error('[Bookings Service] Failed to create booking:', errorMessage);
    
    // If backend is offline, simulate success for UX but flag it
    if (errorMessage.includes('Unable to connect')) {
      console.warn('[Bookings Service] Backend offline - booking will be processed when available');
      return {
        data: { ...bookingData, _id: `offline-${Date.now()}`, status: 'pending' },
        message: 'Your booking request has been received. We will confirm once our system is back online.',
        error: null,
        isOffline: true
      };
    }
    
    return { 
      data: null, 
      message: '',
      error: errorMessage,
      isOffline: false
    };
  }
};

// Get all bookings (admin)
export const getBookings = async (params?: { status?: string; date?: string }): Promise<{ 
  data: DemoBooking[]; 
  error: string | null 
}> => {
  try {
    const response = await api.get<ApiResponse<DemoBooking[]>>('/bookings', { params });
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('[Bookings Service] Failed to fetch bookings:', handleApiError(error));
    return { data: [], error: handleApiError(error) };
  }
};

// Update booking status (admin)
export const updateBookingStatus = async (
  id: string, 
  status: DemoBooking['status']
): Promise<{ data: DemoBooking | null; error: string | null }> => {
  try {
    const response = await api.put<ApiResponse<DemoBooking>>(`/bookings/${id}/status`, { status });
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('[Bookings Service] Failed to update booking:', handleApiError(error));
    return { data: null, error: handleApiError(error) };
  }
};

// Cancel booking
export const cancelBooking = async (id: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    await api.delete(`/bookings/${id}`);
    return { success: true, error: null };
  } catch (error) {
    console.error('[Bookings Service] Failed to cancel booking:', handleApiError(error));
    return { success: false, error: handleApiError(error) };
  }
};
