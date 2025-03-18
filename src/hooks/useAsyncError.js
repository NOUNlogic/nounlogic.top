import { useState } from 'react';

export function useAsyncError() {
  const [_, setError] = useState();
  
  return (e) => {
    setError(() => {
      throw e;
    });
  };
}
