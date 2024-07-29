import React from "react";

import { getGeneratedClassName } from "../theme-engine";

export interface HeaderProperties {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProperties) => {
  const classes = getGeneratedClassName()?.layouts;

  return <header className={classes?.headerFooter}>{children}</header>;
};
