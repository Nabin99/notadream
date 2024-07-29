import { PageLayout } from "@notadream/react";

function App() {
  return (
    <>
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
