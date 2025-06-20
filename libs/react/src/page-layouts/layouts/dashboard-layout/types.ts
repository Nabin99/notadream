import type { ReactNode } from "react";

export interface SidebarProperties {
  title?: string;
  collapsed: boolean;
  onToggle: () => void;
  width: string;
  collapsedWidth: string;
  position: "left" | "right";
  customClass?: string;
  children?: ReactNode;
}

export interface HeaderProperties {
  showMenuToggle: boolean;
  onMenuToggle: () => void;
  customClass?: string;
  children?: ReactNode;
}

export interface DashboardLayoutProperties {
  children?: ReactNode;
  sidebarContent?: ReactNode;
  headerContent?: ReactNode;
  title?: string;
  showSidebar?: boolean;
  sidebarWidth?: string;
  collapsedSidebarWidth?: string;
  sidebarPosition?: "left" | "right";
  headerHeight?: string;
  customSidebarClass?: string;
  customHeaderClass?: string;
  customMainClass?: string;
}
