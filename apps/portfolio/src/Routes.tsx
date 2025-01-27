import { ErrorPage } from "@notadream/react";
import { lazy, Suspense } from "react";
import { createHashRouter } from "react-router-dom";

import { LoadingAnimation } from "./components/LoadingAnimation";
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
    element: (
      <Suspense fallback={<LoadingAnimation></LoadingAnimation>}>
        <Portfolio />
      </Suspense>
    ),
  },
  // {
  //   path: "/blogs",
  //   element: <Page>Blogs</Page>,
  // },
  {
    path: "/about",
    element: (
      <Suspense fallback={<LoadingAnimation></LoadingAnimation>}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/contact",
    element: (
      <Suspense fallback={<LoadingAnimation></LoadingAnimation>}>
        <Contact />
      </Suspense>
    ),
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
