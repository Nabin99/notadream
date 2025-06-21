// src/components/DashboardLayout/Header.tsx
import React from "react";
import { FaBars, FaBell, FaCog, FaUser } from "react-icons/fa";

import { getAppConfig } from "../../../config";
import { LocaleSwitcher } from "../../../i18n";
import { ThemeToggle } from "../../../theme-engine";

import type { HeaderProperties } from "./types";

export const Header: React.FC<HeaderProperties> = ({
  showMenuToggle,
  onMenuToggle,
  customClass = "",
  children,
}) => {
  const supportedLanguages = getAppConfig().i18n.supportedLanguages;

  return (
    <header className={`dashboard-header ${customClass}`}>
      <div className="header-left">
        {showMenuToggle && (
          <button onClick={onMenuToggle} className="header-menu-toggle">
            <FaBars />
          </button>
        )}

        {children || <DefaultHeader />}
      </div>

      <div className="header-actions">
        <button className="header-action-btn">
          <FaBell />
        </button>
        <button className="header-action-btn">
          <FaCog />
        </button>
        <button className="header-user-btn">
          <FaUser />
        </button>
        <ThemeToggle />
        {supportedLanguages.length > 1 ? <LocaleSwitcher /> : null}
      </div>

      <div className="header-menu"></div>
    </header>
  );
};

// Default header content
const DefaultHeader: React.FC = () => {
  return (
    <div className="default-header">
      <h1 className="header-title">Dashboard Overview</h1>
    </div>
  );
};
