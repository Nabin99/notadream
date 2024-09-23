import { Button, ErrorPage, Page } from "@notadream/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@notadream/react/dist/index.css";
import { PageLayout } from "./layouts/PageLayout";

function App() {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            errorElement: <ErrorPage />,
            element: <PageLayout />,
            children: [
              {
                index: true,
                element: (
                  <Page>
                    Home
                    <Button
                      label="button"
                      color="success"
                      variant="borderless"
                      icon="i"
                      iconPosition="right"
                      iconOnly={true}
                    />
                  </Page>
                ),
              },
              {
                path: "/about/company",
                element: <Page>About / Company</Page>,
              },
            ],
          },
        ])}
      />
    </>
  );
}

export default App;
