import React from "react";

import type { SpinnerProperties } from "./type";

export const Spinner: React.FC<SpinnerProperties> = ({
  size = "small",
  className = "",
}) => {
  return (
    <div className={`spinner spinner-${size} ${className}`.trimEnd()}></div>
  );
};

export default Spinner;
