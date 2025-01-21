import { ErrorPage } from "@notadream/react";
import { createHashRouter } from "react-router-dom";

import { PageLayout } from "./layouts/PageLayout";
import { Home } from "./pages";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";
import { Portfolio } from "./pages/portfolio";

const mainLayoutRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  // {
  //   path: "/blogs",
  //   element: <Page>Blogs</Page>,
  // },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
];

export const browserRouter = createHashRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <PageLayout />,
    children: [...mainLayoutRoutes],
  },
]);
