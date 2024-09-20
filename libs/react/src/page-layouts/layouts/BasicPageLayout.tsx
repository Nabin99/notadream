import type { PageLayoutProperties } from "../types";

export const BasicPageLayout = ({
  footer,
  header,
  main,
}: Omit<PageLayoutProperties, "layout" | "sidebar" | "secondarySidebar">) => (
  <div className="page-layout">
    {header ? header : null}
    {main ? main : null}
    {footer ? footer : null}
  </div>
);
