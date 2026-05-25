'use client';

import useSWR from 'swr';
import { getToppers, Topper } from '@/lib/api/toppers';
import { getFaculty, Faculty } from '@/lib/api/faculty';
import { fallbackToppers, fallbackFaculty } from '@/lib/api/fallback-data';

// Hook for fetching toppers with SWR
export function useToppers(year?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ['toppers', year],
    async () => {
      const result = await getToppers({ year });
      if (result.error && !result.isOffline) {
        throw new Error(result.error);
      }
      return result;
    },
    {
      fallbackData: { data: fallbackToppers, error: null, isOffline: true },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError: (err) => {
        console.error('[useToppers] SWR Error:', err.message);
      }
    }
  );

  return {
    toppers: data?.data || fallbackToppers,
    isLoading,
    isError: !!error,
    isOffline: data?.isOffline ?? true,
    error: error?.message || data?.error,
    refresh: mutate
  };
}

// Hook for fetching faculty with SWR
export function useFaculty() {
  const { data, error, isLoading, mutate } = useSWR(
    'faculty',
    async () => {
      const result = await getFaculty();
      if (result.error && !result.isOffline) {
        throw new Error(result.error);
      }
      return result;
    },
    {
      fallbackData: { data: fallbackFaculty, error: null, isOffline: true },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError: (err) => {
        console.error('[useFaculty] SWR Error:', err.message);
      }
    }
  );

  return {
    faculty: data?.data || fallbackFaculty,
    isLoading,
    isError: !!error,
    isOffline: data?.isOffline ?? true,
    error: error?.message || data?.error,
    refresh: mutate
  };
}

// Export types for components
export type { Topper, Faculty };
