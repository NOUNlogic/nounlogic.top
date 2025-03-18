import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching with built-in loading and error handling
 * 
 * @param {Function} fetchFunction - Async function that returns a promise
 * @param {Array} dependencies - Array of dependencies that trigger refetch
 * @param {boolean} immediate - Whether to fetch on mount
 * @returns {Object} Loading state, error state, data, and refetch function
 */
export function useFetch(fetchFunction, dependencies = [], immediate = true) {
  const [isLoading, setIsLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [...dependencies, immediate]);

  return { isLoading, error, data, execute, refetch: execute };
}

export default useFetch;
