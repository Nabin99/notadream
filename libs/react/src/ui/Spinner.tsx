import React from "react";

import type { SpinnerProperties } from "./type";

export const Spinner: React.FC<SpinnerProperties> = ({
  size = "small",
  className = "",
}) => {
  return <div className={`spinner spinner-${size} ${className}`}></div>;
};

export default Spinner;
