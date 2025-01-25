import React from "react";

import type { LogoProperties } from "./type";

export const Logo: React.FC<LogoProperties> = ({
  src,
  alt = "Logo",
  size = "medium",
  className = "",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`logo logo-${size} ${className}`.trimEnd()}
      loading="lazy"
    />
  );
};
