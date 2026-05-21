import { ErrorPage } from "@notadream/react";
import { createHashRouter } from "react-router-dom";

import { PageLayout } from "./layouts/PageLayout";
import { Home } from "./pages";
import AboutLazy from "./pages/about/AboutLazy";
import ContactLazy from "./pages/contact/ContactLazy";
import PortfolioLazy from "./pages/portfolio/PortfolioLazy";

const mainLayoutRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/portfolio",
    element: <PortfolioLazy />,
  },
  // {
  //   path: "/blogs",
  //   element: <Page>Blogs</Page>,
  // },
  {
    path: "/about",
    element: <AboutLazy />,
  },
  {
    path: "/contact",
    element: <ContactLazy />,
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
