import React, { useState } from "react";

import { getGeneratedClassName } from "../theme-engine";

interface PageLayoutProperties {
  layout: "basic" | "sidebar" | "sidebarOverlay";
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  secondarySidebar?: React.ReactNode;
  main?: React.ReactNode;
  sidebarOverlayExtended?: boolean;
}

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

const classes = getGeneratedClassName()?.layouts;

const BasicPageLayout = ({
  footer,
  header,
  main,
}: Omit<PageLayoutProperties, "layout" | "sidebar" | "secondarySidebar">) => (
  <div className={classes?.base}>
    {header ? header : null}
    {main ? main : null}
    {footer ? footer : null}
  </div>
);

const SidebarPageLayout = ({
  footer,
  header,
  main,
  secondarySidebar,
  sidebar,
}: Omit<PageLayoutProperties, "layout">) => (
  <div className={`${classes?.base} ${classes?.sidebarLayout}`}>
    {header ? header : null}
    <div>
      {sidebar ? sidebar : null}
      {main ? main : null}
      {secondarySidebar ? secondarySidebar : null}
    </div>
    {footer ? footer : null}
  </div>
);

const SidebarOverlayPageLayout = ({
  footer,
  header,
  main,
  sidebar,
  sidebarOverlayExtended = false,
}: Omit<PageLayoutProperties, "layout">) => {
  const [expandSidebar, setExpandSidebar] = useState(sidebarOverlayExtended);

  return (
    <div className={classes?.base}>
      {header ? header : null}
      {sidebar && (
        <aside
          className={`${classes?.sidebarOverlay} ${expandSidebar ? classes?.sidebarOverlayOpen : {}}`}
        >
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
