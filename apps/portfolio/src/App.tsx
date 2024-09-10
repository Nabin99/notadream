import { PageLayout, ThemeToggle, useThemeState } from "@notadream/react";

import "@notadream/react/dist/index.css";

function App() {
  const themeState = useThemeState();
  return (
    <>
      <ThemeToggle />
      {themeState.currentColorScheme}-{themeState.currentMode}
      <PageLayout
        layout="sidebar"
        header={"Header"}
        footer={"footer"}
        main="Page content"
        secondarySidebar="any thing"
        sidebarOverlayExtended={true}
        sidebar="Sidebar"
      />
    </>
  );
}

export default App;
