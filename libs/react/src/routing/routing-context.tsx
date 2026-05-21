import { createContext, useContext, ComponentType } from 'react';

export interface LinkProperties {
  href: string;
  [key: string]: unknown;
}

export interface RoutingContextType {
  /**
   * The Link component to use for navigation.
   * For React Router: use React Router's Link or NavLink
   * For Next.js: use next/link
   */
  Link: ComponentType<LinkProperties>;
  /**
   * Get the current pathname
   */
  usePathname: () => string;
  /**
   * Determine if a path is active
   */
  isActive?: (pathname: string, path: string) => boolean;
}

export const RoutingContext = createContext<RoutingContextType | undefined>(
  undefined
);

export const useRouting = (): RoutingContextType => {
  const context = useContext(RoutingContext);
  if (!context) {
    throw new Error(
      'useRouting must be used within a RoutingProvider. ' +
        'Make sure to wrap your app with <RoutingProvider>.'
    );
  }

  return context;
};

export const RoutingProvider: React.FC<{
  children: React.ReactNode;
  value: RoutingContextType;
}> = ({ children, value }) => (
  <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
);
