import { Footer, Header, Logo, Page, PageLayout } from "@notadream/react";
import { ErrorPage } from "@notadream/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@notadream/react/dist/index.css";

import type { NavItemType } from "@notadream/react";

function App() {
  const navItems: NavItemType[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
      children: [
        {
          name: "Team",
          path: "/about/team",
          children: [
            { name: "Consulting", path: "/about/consulting" },
            { name: "Support", path: "/about/support" },
          ],
        },
        { name: "Company", path: "/about/company" },
      ],
    },
    {
      name: "Services",
      path: "fdkfsd",
      children: [
        { name: "Consulting2", path: "/services/consulting" },
        { name: "Support2", path: "/services/support" },
      ],
    },
  ];

  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            errorElement: <ErrorPage />,
            element: (
              <>
                <PageLayout
                  layout="basic"
                  header={
                    <Header
                      navItems={navItems}
                      logo={<Logo src={"/vite.svg"} size="medium" />}
                    ></Header>
                  }
                  footer={<Footer>Footer</Footer>}
                  main={<Page>Page body</Page>}
                />
              </>
            ),
            children: [
              {
                path: "/about/company",
                element: <>child</>,
              },
            ],
          },
        ])}
      />
    </>
  );
}

export default App;
