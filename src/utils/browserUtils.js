// Helper functions to safely work with browser APIs

export const isBrowser = typeof window !== 'undefined';

/**
 * Safely access localStorage with error handling
 */
export const safeLocalStorage = {
  getItem: (key, defaultValue = null) => {
    if (!isBrowser) return defaultValue;
    try {
      const value = window.localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return defaultValue;
    }
  },
  
  setItem: (key, value) => {
    if (!isBrowser) return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      return false;
    }
  },
  
  removeItem: (key) => {
    if (!isBrowser) return false;
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }
};

/**
 * Safely add event listeners with automatic cleanup
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Element|Window} element - Target element (defaults to window)
 * @param {Object} options - Event listener options
 * @returns {Function} Cleanup function
 */
export function useEventListener(event, handler, element = window, options = {}) {
  if (!isBrowser) return () => {};
  
  try {
    element.addEventListener(event, handler, options);
    return () => {
      element.removeEventListener(event, handler, options);
    };
  } catch (error) {
    console.error(`Error attaching event listener for "${event}":`, error);
    return () => {};
  }
}
