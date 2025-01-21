import React from "react";

import type { SpinnerProperties } from "./type";

export const Spinner: React.FC<SpinnerProperties> = ({
  size = "small",
  className = "",
}) => {
  return (
    <div
      className={`loading-spinner loading-spinner-${size} ${className}`.trimEnd()}
    ></div>
  );
};

export default Spinner;
