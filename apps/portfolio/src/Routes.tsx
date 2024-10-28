import { ErrorPage, Page } from "@notadream/react";
import { createBrowserRouter } from "react-router-dom";

import { PageLayout } from "./layouts/PageLayout";
import { Home } from "./pages";

const mainLayoutRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/portfolio",
    element: <Page>Portfolio</Page>,
  },
  {
    path: "/blogs",
    element: <Page>Blogs</Page>,
  },
  {
    path: "/about",
    element: <Page>About</Page>,
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
