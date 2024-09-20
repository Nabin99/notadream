import { HiChevronDown } from "react-icons/hi";
import { NavLink } from "react-router-dom";

import type { NavItemProperties } from "../../types";

export const NavItem: React.FC<NavItemProperties> = ({
  name,
  path,
  icon,
  iconOnly,
  isActive,
  hasChildren,
  childIndicatorIcon = <HiChevronDown />,
  children,
}) => {
  return (
    <>
      {/* If the item has children, render a non-clickable parent item */}
      {hasChildren ? (
        <div
          className={`nav-item ${isActive ? "active" : ""}`}
          title={name}
          aria-label={name}
        >
          {icon && <span className="link-icon">{icon}</span>}
          {!iconOnly && <span className="link-name">{name}</span>}
          {childIndicatorIcon && (
            <span className="child-indicator">{childIndicatorIcon}</span>
          )}
          {children}
        </div>
      ) : (
        <NavLink
          to={path || "#"}
          className="nav-item"
          title={name}
          aria-label={name}
        >
          {icon && <span className="link-icon">{icon}</span>}
          {!iconOnly && <span className="link-name">{name}</span>}
          {children}
        </NavLink>
      )}
    </>
  );
};
