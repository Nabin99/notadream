import { Layout, ThemeToggle, getThemeConfig } from "@notadream/react";

function App() {
  return (
    <>
      <Layout
        layout="sidebarOverlay"
        header={"Header"}
        footer={"footer"}
        sidebar={false}
        gridItems={[
          <ThemeToggle key={1} />,
          <>Children</>,
          <button
            key={2}
            className={
              getThemeConfig().mappedClassNames?.secondaryButton as string
            }
          >
            Secondary
          </button>,
        ]}
        mainContent={
          <>
            <ThemeToggle />
            <>children</>
            <button
              className={
                getThemeConfig().mappedClassNames?.secondaryButton as string
              }
            >
              Secondary
            </button>
          </>
        }
      ></Layout>
    </>
  );
}

export default App;
