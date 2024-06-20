import { getGeneratedClassName } from "../ThemeEngine";

export interface FooterProperties {
  children: React.ReactNode;
}

export const Footer = ({ children }: FooterProperties) => {
  const classes = getGeneratedClassName()?.layouts;

  return <footer className={classes?.headerFooter}>{children}</footer>;
};
