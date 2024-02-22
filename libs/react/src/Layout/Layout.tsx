import { FC } from "react";
import * as stylex from "@stylexjs/stylex";

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

const layoutStyle = stylex.create({
  base: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  header: {
    gridArea: `'header header' 'main main' 'footer footer'`,
  },
  sidebar: {
    gridArea: `'sidebar header' 'sidebar main' 'sidebar footer'`,
  },
  both: {
    gridArea: `'header header' 'sidebar main' 'footer footer'`,
  },
});

export const Layout: FC<LayoutProperties> = ({
  children,
  header,
  footer,
  sidebar,
  type,
}) => {
  return (
    <div {...stylex.props(layoutStyle.base, layoutStyle[type || "header"])}>
      {header || <Header />}
      {type !== "header" ? sidebar || <Sidebar /> : null}
      <main style={{ minHeight: "100vh" }}>{children}</main>
      {footer || <Footer />}
    </div>
  );
};
