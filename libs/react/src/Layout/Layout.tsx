import { FC } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export interface LayoutProperties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  type?: "sidebar" | "header" | "both";
}

export const Layout: FC<LayoutProperties> = ({
  children,
  header,
  footer,
  sidebar,
  type,
}) => {
  return (
    <div>
      {header || <Header />}
      {type !== "header" ? sidebar || <Sidebar /> : null}
      <main style={{ minHeight: "100vh" }}>{children}</main>
      {footer || <Footer />}
    </div>
  );
};
