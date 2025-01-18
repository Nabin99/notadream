import { ErrorPage, Page } from "@notadream/react";
import { createBrowserRouter } from "react-router-dom";

import { PageLayout } from "./layouts/PageLayout";
import { Home } from "./pages";
import { About } from "./pages/about";
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
  {
    path: "/blogs",
    element: <Page>Blogs</Page>,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Page>Contact</Page>,
  },
];

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <PageLayout />,
    children: [...mainLayoutRoutes],
  },
]);
