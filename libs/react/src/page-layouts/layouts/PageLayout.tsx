import { BasicPageLayout } from "./BasicPageLayout";
import { SidebarOverlayPageLayout } from "./SidebarOverlayPageLayout";
import { SidebarPageLayout } from "./SidebarPageLayout";

import type { PageLayoutProperties } from "../types";

export const PageLayout: React.FC<PageLayoutProperties> = ({
  layout,
  header,
  footer,
  sidebar,
  secondarySidebar,
  sidebarOverlayExtended,
  main,
}) => {
  switch (layout) {
    case "basic":
      return (
        <>
          <BasicPageLayout header={header} footer={footer} main={main} />
        </>
      );
    case "sidebar":
      return (
        <>
          <SidebarPageLayout
            header={header}
            footer={footer}
            main={main}
            secondarySidebar={secondarySidebar}
            sidebar={sidebar}
          />
        </>
      );
    case "sidebarOverlay":
      return (
        <>
          <SidebarOverlayPageLayout
            header={header}
            footer={footer}
            main={main}
            secondarySidebar={secondarySidebar}
            sidebar={sidebar}
            sidebarOverlayExtended={sidebarOverlayExtended}
          />
        </>
      );
    default:
      return <BasicPageLayout header={header} footer={footer} main={main} />;
  }
};
