import type { ReactNode } from "react";

export interface PageLayoutProperties {
  layout: "basic" | "sidebar" | "sidebarOverlay";
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  secondarySidebar?: React.ReactNode;
  main?: React.ReactNode;
  sidebarOverlayExtended?: boolean;
}

export interface NavItemProperties {
  hasChildren?: boolean;
  childIndicatorIcon?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  iconOnly?: boolean;
  isActive?: boolean;
  name: string;
  path: string;
}

export interface NavItemType {
  children?: NavItemType[];
  icon?: ReactNode;
  name: string;
  path: string;
}

export interface NavigationMenuProperties
  extends React.HTMLAttributes<HTMLElement> {
  items: NavItemType[];
  childIndicatorIcon?: ReactNode;
  openItems?: string[];
  setOpenItem?: (itemName: string) => void;
  toggleMenuOpen?: () => void;
  iconOnly?: boolean;
}
