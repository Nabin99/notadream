import { useState } from "react";

import type { PageLayoutProperties } from "../types";

export const SidebarOverlayPageLayout = ({
  footer,
  header,
  main,
  sidebar,
  sidebarOverlayExtended = false,
}: Omit<PageLayoutProperties, "layout">) => {
  const [expandSidebar, setExpandSidebar] = useState(sidebarOverlayExtended);

  return (
    <div className="page-layout sidebar-overlay">
      {header ? header : null}
      {sidebar && (
        <aside>
          <button onClick={() => setExpandSidebar((pre) => !pre)}> |||</button>
          {sidebar}
          {`${expandSidebar}`}
        </aside>
      )}
      {main ? main : null}
      {footer ? footer : null}
    </div>
  );
};
