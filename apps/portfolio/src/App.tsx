import { Layout, ThemeToggle } from "@notadream/react";

function App() {
  // const theme = useThemeState();

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
