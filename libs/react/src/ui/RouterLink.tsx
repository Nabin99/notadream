import { NavLink } from "react-router-dom";

import type { LinkProperties } from "./type";

export const RouterLink: React.FC<LinkProperties> = ({
  to,
  iconLeft,
  iconRight,
  iconOnly,
  children,
  variant = "solid",
  size = "medium",
  disabled = false,
  className = "",
  target = "_self",
  label,
}) => {
  return (
    <NavLink
      to={disabled ? "#" : to}
      className={`link ${variant} ${size} ${disabled ? "disabled" : ""} ${className}`}
      aria-disabled={disabled}
      target={target}
    >
      {iconLeft && !iconOnly && <span className="icon-left">{iconLeft}</span>}
      {iconOnly && iconLeft && <span className="icon-only">{iconLeft}</span>}
      {children && !iconOnly && <span className="link-text">{label}</span>}
      {iconRight && !iconOnly && (
        <span className="icon-right">{iconRight}</span>
      )}
      {children}
    </NavLink>
  );
};
