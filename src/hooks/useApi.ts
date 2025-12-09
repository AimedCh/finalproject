import { useState, useCallback, useEffect } from 'react';

/**
 * Tipos para el Hook useApi
 */
interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  autoFetch?: boolean;
  baseUrl?: string;
}

/**
 * Hook personalizado para manejar llamadas a API
 * 
 * @example
 * const { data, loading, error, fetch } = useApi<Product[]>('/api/products');
 * 
 * @example
 * const { data, loading, error, fetch } = useApi<User>('/api/user', {
 *   autoFetch: false,
 *   method: 'POST'
 * });
 * 
 * useEffect(() => {
 *   fetch({ body: { name: 'John' } });
 * }, []);
 */
export function useApi<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): ApiResponse<T> & { fetch: (opts?: Partial<ApiOptions>) => Promise<T | null> } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const baseUrl = options.baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  const method = options.method || 'GET';

  /**
   * Función para realizar la llamada a la API
   */
  const fetch = useCallback(
    async (opts?: Partial<ApiOptions>): Promise<T | null> => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const mergedOptions = { ...options, ...opts };
        const url = `${baseUrl}${endpoint}`;

        const config: RequestInit = {
          method: mergedOptions.method || method,
          headers: {
            'Content-Type': 'application/json',
            ...mergedOptions.headers,
          },
        };

        // Agregar token de autenticación si existe
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`,
          };
        }

        // Agregar body si existe
        if (mergedOptions.body) {
          config.body = JSON.stringify(mergedOptions.body);
        }

        const response = await fetch(url, config);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Error ${response.status}: ${response.statusText}`
          );
        }

        const result: T = await response.json();
        setData(result);
        setSuccess(true);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        setData(null);
        setSuccess(false);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, baseUrl, method, options]
  );

  /**
   * Auto-fetch al montar el componente si autoFetch es true
   */
  useEffect(() => {
    if (options.autoFetch !== false && method === 'GET') {
      fetch();
    }
  }, [endpoint, options.autoFetch, method, fetch]);

  return {
    data,
    loading,
    error,
    success,
    fetch,
  };
}

export default useApi;

