import { useState, useEffect, useCallback } from 'react';

interface UseOptimizedDataOptions<T> {
  initialData: T[];
  fetchFunction?: () => Promise<{ success: boolean; data: T[] }>;
  cacheKey?: string;
  cacheDuration?: number; // in minutes
}

export function useOptimizedData<T>({
  initialData,
  fetchFunction,
  cacheKey,
  cacheDuration = 5
}: UseOptimizedDataOptions<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCachedData = useCallback(() => {
    if (!cacheKey) return null;
    
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        const now = Date.now();
        const cacheExpiry = cacheDuration * 60 * 1000; // Convert to milliseconds
        
        if (now - timestamp < cacheExpiry) {
          return cachedData;
        }
      }
    } catch (error) {
      console.warn('Error reading cache:', error);
    }
    
    return null;
  }, [cacheKey, cacheDuration]);

  const setCachedData = useCallback((newData: T[]) => {
    if (!cacheKey) return;
    
    try {
      const cacheData = {
        data: newData,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Error setting cache:', error);
    }
  }, [cacheKey]);

  const fetchData = useCallback(async () => {
    if (!fetchFunction) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchFunction();
      if (response.success && response.data.length > 0) {
        setData(response.data);
        setCachedData(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching data');
      console.warn('Fetch failed, using cached/initial data');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, setCachedData]);

  useEffect(() => {
    // Check cache first
    const cachedData = getCachedData();
    if (cachedData) {
      setData(cachedData);
    }

    // Fetch fresh data in background
    if (fetchFunction) {
      fetchData();
    }
  }, [getCachedData, fetchData, fetchFunction]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
