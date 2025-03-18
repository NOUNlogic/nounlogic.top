import { useState, useEffect } from 'react';

/**
 * Component that renders its children only on the client-side
 * Helps prevent hydration errors for components that rely on browser-only APIs
 */
export default function ClientOnly({ children, fallback = null }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return fallback;
  }

  return children;
}
