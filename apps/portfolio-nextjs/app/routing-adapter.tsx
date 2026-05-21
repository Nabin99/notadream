'use client';

import { RoutingProvider, type RoutingContextType } from '@notadream/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Next.js adapter - provides routing context for Next.js apps
 */
export const NextJsAdapter: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const pathname = usePathname();

  const routingValue: RoutingContextType = {
    Link: Link as any,
    usePathname: () => pathname,
    isActive: (currentPathname: string, path: string) => {
      return currentPathname === path;
    },
  };

  return (
    <RoutingProvider value={routingValue}>
      {children}
    </RoutingProvider>
  );
};
