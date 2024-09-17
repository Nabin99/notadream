import { useLocation } from "react-router-dom";

import { NavItem } from "./NavItem";

import type { NavbarProperties, NavItemType } from "../../types";

export const Navbar: React.FC<NavbarProperties> = ({
  className = "",
  childIndicatorIcon,
  items,
  iconOnly = false,
  openItems = [],
  setOpenItem,
  toggleMenuOpen,
  ...properties
}) => {
  const location = useLocation();

  const handleToggleItem = (name: string) => {
    setOpenItem?.(name);
  };

  // Helper function to check if the current path is active
  const isPathActive = (item: NavItemType): boolean => {
    if (item.path && location.pathname == item.path) {
      return true;
    }

    if (item.children?.some((child) => child.path == location.pathname)) {
      return true;
    }

    return false;
  };

  const renderNavItems = (navItems: NavItemType[], level = 0) => (
    <ul className={`nav-list ${level > 0 ? "nested-level" : ""}`} role="list">
      {navItems.map((item, index) => {
        const isActive = isPathActive(item);
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openItems.includes(item.name);

        return (
          <li
            key={index}
            className={`nav-list-item ${isActive ? "active" : ""} ${hasChildren ? "has-children" : ""}`}
            onClick={
              hasChildren
                ? (event) => {
                    event.stopPropagation();
                    handleToggleItem(item.name);
                  }
                : () => toggleMenuOpen?.()
            }
          >
            <NavItem
              name={item.name}
              path={item.path}
              childIndicatorIcon={childIndicatorIcon}
              hasChildren={hasChildren}
              icon={item.icon}
              iconOnly={iconOnly}
              isActive={isActive}
            />

            {hasChildren &&
              isOpen &&
              renderNavItems(item.children || [], level + 1)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav
      className={`navbar ${className}`}
      aria-label="Navigation bar"
      {...properties}
    >
      {renderNavItems(items)}
    </nav>
  );
};
