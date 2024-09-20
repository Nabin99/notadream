import { ReactNode, useState } from "react";

import { Navbar } from "./nav";
import { ThemeToggle } from "../../theme-engine";

import type { NavItemType } from "../types";
import { NavLink } from "react-router-dom";

export interface HeaderProperties {
  navItems?: NavItemType[];
  logo: ReactNode;
}

export const Header = ({ navItems, logo }: HeaderProperties) => {
  const [isMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="brand-logo-container">
        <NavLink to={"/"} aria-label="logo">
          {logo}
        </NavLink>
      </div>
      <button
        className="toggle-nav-menu"
        onClick={handleToggleMobileMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? "X" : "☰"}
      </button>
      {navItems ? (
        <Navbar
          items={navItems || []}
          openItems={openItems}
          className={`${isMenuOpen ? "open" : ""}`}
          setOpenItem={(name) => {
            if (openItems.includes(name)) {
              setOpenItems((pre) => pre.filter((item) => item !== name));
            } else {
              setOpenItems((pre) => [...pre, name]);
            }
          }}
          toggleMenuOpen={handleToggleMobileMenu}
        />
      ) : null}
      <div className="header-menu">
        <ThemeToggle />
      </div>
    </header>
  );
};
