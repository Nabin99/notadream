import { ErrorPage } from "@notadream/react";
import { lazy } from "react";
import { createHashRouter } from "react-router-dom";

import { PageLayout } from "./layouts/PageLayout";
import { Home } from "./pages";

// eslint-disable-next-line react-refresh/only-export-components
const About = lazy(() => import("./pages/about/About"));
// eslint-disable-next-line react-refresh/only-export-components
const Contact = lazy(() => import("./pages/contact/Contact"));
// eslint-disable-next-line react-refresh/only-export-components
const Portfolio = lazy(() => import("./pages/portfolio/Portfolio"));

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
