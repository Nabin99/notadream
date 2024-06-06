import { useState } from "react";

import { getGeneratedClassName } from "../ThemeEngine";

interface LayoutProperties {
  layout:
    | "basic"
    | "sidebar"
    | "split"
    | "headerContentFooter"
    | "grid"
    | "center"
    | "sidebarOverlay";
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  mainContent: React.ReactNode;
  gridItems?: React.ReactNode[];
}

export const Layout: React.FC<LayoutProperties> = ({
  layout,
  header,
  footer,
  sidebar,
  mainContent,
  gridItems,
}) => {
  const classes = getGeneratedClassName()?.layouts;

  const renderBasicLayout = () => (
    <div className={classes?.base}>
      {header && <header className={classes?.headerFooter}>{header}</header>}
      <main className={classes?.main}>{mainContent}</main>
      {footer && <footer className={classes?.headerFooter}>{footer}</footer>}
    </div>
  );

  const renderSidebarLayout = () => (
    <div className={`${classes?.base} ${classes?.sidebarLayout}`}>
      {header && (
        <header
          style={{ gridArea: "header" }}
          className={classes?.headerFooter}
        >
          {header}
        </header>
      )}
      <aside className={classes?.sidebar}>{sidebar}</aside>
      <main style={{ gridArea: "main" }} className={classes?.main}>
        {mainContent}
      </main>
      {footer && (
        <footer
          style={{ gridArea: "footer" }}
          className={classes?.headerFooter}
        >
          {footer}
        </footer>
      )}
    </div>
  );

  const renderSplitLayout = () => (
    <div className={`${classes?.base} ${classes?.splitLayout}`}>
      {header && (
        <header
          style={{ gridArea: "header" }}
          className={classes?.headerFooter}
        >
          {header}
        </header>
      )}
      <section className={classes?.splitLeft}>{sidebar}</section>
      <section className={classes?.splitRight}>{mainContent}</section>
      {footer && (
        <footer
          style={{ gridArea: "footer" }}
          className={classes?.headerFooter}
        >
          {footer}
        </footer>
      )}
    </div>
  );

  const renderHeaderContentFooterLayout = () => (
    <div className={classes?.base}>
      {header && <header className={classes?.headerFooter}>{header}</header>}
      <main className={classes?.main}>{mainContent}</main>
      {footer && <footer className={classes?.headerFooter}>{footer}</footer>}
    </div>
  );

  const renderGridLayout = () => (
    <div className={classes?.base}>
      {header && <header className={classes?.headerFooter}>{header}</header>}
      <div className={classes?.gridLayout}>
        {gridItems?.map((item, index) => (
          <div key={index} className={classes?.gridItem}>
            {item}
          </div>
        ))}
      </div>
      {footer && <footer className={classes?.headerFooter}>{footer}</footer>}
    </div>
  );

  const renderCenterLayout = () => (
    <div className={classes?.centerLayout}>
      <div className={classes?.centerContent}>{mainContent}</div>
    </div>
  );

  const renderSidebarOverlayLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    setSidebarOpen;

    return (
      <div className={classes?.base}>
        {header && <header className={classes?.headerFooter}>{header}</header>}
        <div style={{ display: "flex", flexGrow: 1 }}>
          {sidebar && (
            <aside
              className={`${classes?.sidebarOverlay} ${sidebarOpen ? classes?.sidebarOverlayOpen : {}}`}
            >
              {sidebar}
            </aside>
          )}
          <main className={classes?.main}>{mainContent}</main>
        </div>
        {footer && <footer className={classes?.headerFooter}>{footer}</footer>}
      </div>
    );
  };

  switch (layout) {
    case "basic":
      return renderBasicLayout();
    case "sidebar":
      return renderSidebarLayout();
    case "split":
      return renderSplitLayout();
    case "headerContentFooter":
      return renderHeaderContentFooterLayout();
    case "grid":
      return renderGridLayout();
    case "center":
      return renderCenterLayout();
    case "sidebarOverlay":
      return renderSidebarOverlayLayout();
    default:
      return renderBasicLayout();
  }
};
