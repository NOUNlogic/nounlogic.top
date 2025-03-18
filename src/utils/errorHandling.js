/**
 * Safely extracts error message even from non-standard error objects
 * @param {*} error - Any error type
 * @returns {string} Formatted error message
 */
export function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  try {
    return JSON.stringify(error);
  } catch (e) {
    return 'Unknown error occurred';
  }
}

/**
 * Create a standardized error object with consistent properties
 * @param {string} code - Error code for categorization
 * @param {string} message - Human-readable error message
 * @param {Object} details - Additional error metadata
 * @returns {Error} Enhanced error object
 */
export function createAppError(code, message, details = {}) {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  return error;
}

/**
 * Safe wrapper for async functions to standardize error handling
 * @param {Function} fn - Async function to execute
 * @returns {Promise} Promise that won't throw but resolves to {data, error}
 */
export async function safeAsync(fn) {
  try {
    const result = await fn();
    return { data: result, error: null };
  } catch (error) {
    console.error('Operation failed:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error(getErrorMessage(error))
    };
  }
}
