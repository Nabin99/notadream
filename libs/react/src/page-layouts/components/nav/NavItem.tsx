import { HiChevronDown } from 'react-icons/hi';

import { useRouting } from '../../../routing';

import type { NavItemProperties } from '../../types';

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
  const { Link } = useRouting();

  return (
    <>
      {/* If the item has children, render a non-clickable parent item */}
      {hasChildren ? (
        <div
          className={`nav-item ${isActive ? "active" : ""}`.trimEnd()}
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
        <Link
          href={path || "#"}
          className={`nav-item ${isActive ? "active" : ""}`.trimEnd()}
          title={name}
          aria-label={name}
        >
          {icon && <span className="link-icon">{icon}</span>}
          {!iconOnly && <span className="link-name">{name}</span>}
          {children}
        </Link>
      )}
    </>
  );
};
