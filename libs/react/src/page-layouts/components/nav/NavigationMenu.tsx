import { NavItem } from "./NavItem";
import { useRouting } from "../../../routing";

import type { NavigationMenuProperties, NavItemType } from "../../types";

export const NavigationMenu: React.FC<NavigationMenuProperties> = ({
  className = "",
  childIndicatorIcon,
  items,
  iconOnly = false,
  openItems = [],
  setOpenItem,
  toggleMenuOpen,
  pathname,
  ...properties
}) => {
  const { usePathname, isActive: checkActive } = useRouting();
  // Use provided pathname or get current pathname from routing context
  const currentPathname = pathname || usePathname();

  const handleToggleItem = (name: string) => {
    setOpenItem?.(name);
  };

  // Helper function to check if the current path is active
  const isPathActive = (item: NavItemType): boolean => {
    if (item.path) {
      // Use the isActive function from routing context if available
      if (checkActive) {
        if (checkActive(currentPathname, item.path)) {
          return true;
        }
      } else {
        // Fallback comparison
        if (currentPathname === item.path) {
          return true;
        }
      }
    }

    if (item.children?.some((child) => {
      if (checkActive) {
        return checkActive(currentPathname, child.path || "");
      }
      return currentPathname === child.path;
    })) {
      return true;
    }

    return false;
  };

  const renderNavItems = (navItems: NavItemType[], level = 0) => (
    <ul
      className={`nav-list ${level > 0 ? "nested-level" : ""}`.trimEnd()}
      role="list"
    >
      {navItems.map((item, index) => {
        const isActive = isPathActive(item);
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openItems.includes(item.name);

        return (
          <li
            key={index}
            className={`nav-list-item ${isActive ? "active" : ""} ${hasChildren ? "has-children" : ""}`.trimEnd()}
            onClick={
              hasChildren
                ? (event) => {
                    event.stopPropagation();
                    handleToggleItem(item.name);
                  }
                : () => {
                    toggleMenuOpen?.();
                    handleToggleItem(item.name);
                  }
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
      className={`navigation-menu ${className}`}
      aria-label="Navigation menu"
      {...properties}
    >
      {renderNavItems(items)}
    </nav>
  );
};
