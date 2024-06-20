import { PageLayout } from "@notadream/react";

function App() {
  return (
    <>
      <PageLayout
        layout="sidebarOverlay"
        header={"Header"}
        footer={"footer"}
        main="Page content"
        secondarySidebar="true"
        sidebarOverlayExtended={true}
        sidebar="Sidebar"
      />
    </>
  );
}

export default App;
