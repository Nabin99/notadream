import type { PageLayoutProperties } from "../types";

export const SidebarPageLayout = ({
  footer,
  header,
  main,
  secondarySidebar,
  sidebar,
}: Omit<PageLayoutProperties, "layout">) => (
  <div className="page-layout sidebar">
    {header ? header : null}
    <div>
      {sidebar ? sidebar : null}
      {main ? main : null}
      {secondarySidebar ? secondarySidebar : null}
    </div>
    {footer ? footer : null}
  </div>
);
