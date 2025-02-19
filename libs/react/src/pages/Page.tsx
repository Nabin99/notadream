import React, { useEffect } from "react";

import ScrollToTop from "./ScrollToTop";

import type { PageProperties } from "./type";

export const Page: React.FC<PageProperties> = ({
  title,
  subtitle,
  badges = [],
  children,
  className = "",
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={`page-container ${className}`.trimEnd()}>
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
      <ScrollToTop />
    </main>
  );
};
