import React from "react";

export interface HeaderProperties {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProperties) => {
  return <header>{children}</header>;
};
