// src/components/DashboardLayout/Sidebar.tsx
import React from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

import type { SidebarProperties } from "./types";

export const Sidebar: React.FC<SidebarProperties> = ({
  title = "Dashboard",
  collapsed,
  onToggle,
  width,
  collapsedWidth,
  position,
  customClass = "",
  children,
}) => {
  const sidebarWidth = collapsed ? collapsedWidth : width;

  return (
    <aside
      className={`dashboard-sidebar ${sidebarWidth} ${position === "right" ? "order-last" : ""} ${customClass}`}
    >
      <div className="sidebar-header">
        {!collapsed && <h2 className="sidebar-title">{title}</h2>}
        <button onClick={onToggle} className="sidebar-toggle-btn">
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <div className="sidebar-content">
        {children || <DefaultSidebar collapsed={collapsed} />}
      </div>
    </aside>
  );
};

// Default sidebar content
const DefaultSidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <div className="menu-icon dashboard-icon">D</div>,
    },
    {
      name: "Analytics",
      icon: <div className="menu-icon analytics-icon">A</div>,
    },
    {
      name: "Customers",
      icon: <div className="menu-icon customers-icon">C</div>,
    },
    {
      name: "Products",
      icon: <div className="menu-icon products-icon">P</div>,
    },
    {
      name: "Settings",
      icon: <div className="menu-icon settings-icon">S</div>,
    },
  ];

  return (
    <nav className="default-sidebar-nav">
      {menuItems.map((item, index) => (
        <a key={index} href="#" className="sidebar-nav-item">
          {item.icon}
          {!collapsed && <span>{item.name}</span>}
        </a>
      ))}
    </nav>
  );
};

// Mobile Sidebar version
export const MobileSidebar: React.FC<
  SidebarProperties & { isOpen: boolean; onClose: () => void }
> = ({
  title = "Dashboard",
  width,
  isOpen,
  onClose,
  customClass = "",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />
      <aside className={`mobile-sidebar ${width} ${customClass}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">{title}</h2>
          <button onClick={onClose} className="sidebar-toggle-btn">
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-content">
          {children || <DefaultSidebar collapsed={false} />}
        </div>
      </aside>
    </>
  );
};
