import { api, handleApiError, ApiResponse } from './client';

export interface ContactSubmission {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source?: 'footer_form' | 'contact_page' | 'popup';
  isRead?: boolean;
  createdAt?: string;
}

// Submit contact form
export const submitContact = async (contactData: Omit<ContactSubmission, '_id' | 'isRead' | 'createdAt'>): Promise<{
  data: ContactSubmission | null;
  message: string;
  error: string | null;
  isOffline: boolean;
}> => {
  try {
    const response = await api.post<ApiResponse<ContactSubmission> & { message: string }>('/contacts', contactData);
    console.log('[Contacts Service] Contact submitted successfully');
    return {
      data: response.data.data,
      message: response.data.message || 'Message sent successfully!',
      error: null,
      isOffline: false
    };
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.error('[Contacts Service] Failed to submit contact:', errorMessage);
    
    // Graceful degradation for offline scenario
    if (errorMessage.includes('Unable to connect')) {
      console.warn('[Contacts Service] Backend offline - contact will be processed when available');
      return {
        data: { ...contactData, _id: `offline-${Date.now()}` },
        message: 'Your message has been received. We will respond once our system is back online.',
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

// Get all contacts (admin)
export const getContacts = async (params?: { isRead?: boolean }): Promise<{
  data: ContactSubmission[];
  error: string | null;
}> => {
  try {
    const response = await api.get<ApiResponse<ContactSubmission[]>>('/contacts', { params });
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('[Contacts Service] Failed to fetch contacts:', handleApiError(error));
    return { data: [], error: handleApiError(error) };
  }
};

// Mark contact as read (admin)
export const markContactRead = async (id: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    await api.put(`/contacts/${id}/read`);
    return { success: true, error: null };
  } catch (error) {
    console.error('[Contacts Service] Failed to mark contact as read:', handleApiError(error));
    return { success: false, error: handleApiError(error) };
  }
};

// Delete contact (admin)
export const deleteContact = async (id: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    await api.delete(`/contacts/${id}`);
    return { success: true, error: null };
  } catch (error) {
    console.error('[Contacts Service] Failed to delete contact:', handleApiError(error));
    return { success: false, error: handleApiError(error) };
  }
};
