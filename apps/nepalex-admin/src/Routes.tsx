import { ErrorPage } from "@notadream/react";
// import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

// import { LoadingAnimation } from "./components/LoadingAnimation";
import { PageLayout } from "./layouts/PageLayout";
import { Home } from "./pages";

const mainLayoutRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
];

const authRoutes: RouteObject[] = [];

export const browserRouter = createBrowserRouter([
  {
    index: "/",
    errorElement: <ErrorPage />,
    element: <PageLayout />,
    children: [...mainLayoutRoutes],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    children: [...authRoutes],
  },
]);
