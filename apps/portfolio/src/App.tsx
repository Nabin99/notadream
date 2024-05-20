import { Layout, ThemeToggle, useThemeState } from "@notadream/react";

function App() {
  const theme = useThemeState();
  console.log(theme);

  return (
    <>
      <Layout type="header">
        <ThemeToggle />
        <>children</>
      </Layout>
    </>
  );
}

export default App;
