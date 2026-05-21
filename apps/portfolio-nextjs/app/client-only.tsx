'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * Component that only renders on the client side.
 * Returns null during server-side rendering.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
}
