import { Footer, Header, Logo, PageLayout } from "@notadream/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@notadream/react/dist/index.css";

import type { NavItemType } from "@notadream/react/dist/src/page-layouts/types";

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
            { name: "Consulting", path: "/services/consulting" },
            { name: "Support", path: "/services/support" },
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
                  footer={<Footer>footer</Footer>}
                  main={<main>Page content</main>}
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
