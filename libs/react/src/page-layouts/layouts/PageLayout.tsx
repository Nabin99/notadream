import { BasicPageLayout } from "./BasicPageLayout";
import { DashboardLayout } from "./dashboard-layout";
import { SidebarPageLayout } from "./SidebarPageLayout";

import type { PageLayoutProperties } from "../types";

export const PageLayout: React.FC<PageLayoutProperties> = ({
  layout,
  header,
  footer,
  sidebar,
  secondarySidebar,
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
    case "dashboard":
      return (
        <>
          <DashboardLayout headerContent={header} sidebarContent={sidebar}>
            {main}
          </DashboardLayout>
        </>
      );
    default:
      return <BasicPageLayout header={header} footer={footer} main={main} />;
  }
};
