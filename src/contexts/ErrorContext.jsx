import React, { createContext, useState, useContext, useCallback } from 'react';

const ErrorContext = createContext(null);

export function ErrorProvider({ children }) {
  const [errors, setErrors] = useState([]);

  const addError = useCallback((error) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorId = Date.now();
    
    setErrors((prevErrors) => [
      ...prevErrors,
      { id: errorId, message: errorMessage, timestamp: new Date() }
    ]);
    
    return errorId;
  }, []);

  const removeError = useCallback((errorId) => {
    setErrors((prevErrors) => prevErrors.filter(e => e.id !== errorId));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return (
    <ErrorContext.Provider value={{ errors, addError, removeError, clearErrors }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}
