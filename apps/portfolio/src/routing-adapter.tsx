import React from 'react';
import { RoutingProvider, type RoutingContextType } from '@notadream/react';
import { Link as ReactRouterLink, useLocation, useNavigate } from 'react-router-dom';

/**
 * Link component wrapper that converts href to to prop for react-router-dom
 */
const LinkWrapper = React.forwardRef<
  HTMLAnchorElement,
  { href: string; children: React.ReactNode; className?: string; title?: string; 'aria-label'?: string }
>(({ href, children, className, title, 'aria-label': ariaLabel }, ref) => {
  return (
    <ReactRouterLink
      ref={ref}
      to={href}
      className={className}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </ReactRouterLink>
  );
});

LinkWrapper.displayName = 'LinkWrapper';

/**
 * React Router adapter - provides routing context for React Router-based apps
 */
export const ReactRouterAdapter: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routingValue: RoutingContextType = {
    Link: LinkWrapper as any,
    usePathname: () => location.pathname,
    isActive: (pathname: string, path: string) => {
      // Normalize paths for comparison
      const normalizedPathname = pathname.replace(/\/$/, '') || '/';
      const normalizedPath = path.replace(/\/$/, '') || '/';
      return normalizedPathname === normalizedPath;
    },
  };

  return (
    <RoutingProvider value={routingValue}>
      {children}
    </RoutingProvider>
  );
};
