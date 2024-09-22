import React from "react";

import type { PageProperties } from "./type";

export const Page: React.FC<PageProperties> = ({
  title,
  subtitle,
  badges = [],
  children,
  className = "",
  fullWidth = false,
}) => {
  return (
    <main
      className={`page-container ${fullWidth ? "full-width" : ""} ${className}`}
    >
      {/* Page Title, Subtitle, and Badges */}
      {(title || subtitle || badges.length > 0) && (
        <div className="page-header">
          {title && <h1 className="page-title">{title}</h1>}
          {subtitle && <h2 className="page-subtitle">{subtitle}</h2>}
          {badges.length > 0 && (
            <div className="page-badges">
              {badges.map((badge, index) => (
                <span key={index} className={`badge ${badge.className}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="page-content">{children}</div>
    </main>
  );
};
