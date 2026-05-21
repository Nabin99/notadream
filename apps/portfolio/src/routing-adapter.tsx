import { RoutingProvider, type RoutingContextType } from '@notadream/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

/**
 * React Router adapter - provides routing context for React Router-based apps
 */
export const ReactRouterAdapter: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const location = useLocation();

  const routingValue: RoutingContextType = {
    Link: ReactRouterLink,
    usePathname: () => location.pathname,
    isActive: (pathname: string, path: string) => {
      return pathname === path;
    },
  };

  return (
    <RoutingProvider value={routingValue}>
      {children}
    </RoutingProvider>
  );
};
