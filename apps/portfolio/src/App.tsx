import { Layout, ThemeToggle, getThemeConfig } from "@notadream/react";

function App() {
  return (
    <>
      <Layout type="header">
        <ThemeToggle />
        <>children</>
        <button className={getThemeConfig().mappedClassNames?.secondaryButton}>
          Secondary
        </button>
      </Layout>
    </>
  );
}

export default App;
