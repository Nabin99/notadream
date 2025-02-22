import { lazy, Suspense } from "react";

import { LoadingAnimation } from "../../components/LoadingAnimation";

const Portfolio = lazy(() => import("./Portfolio"));

const PortfolioLazy = () => (
  <Suspense fallback={<LoadingAnimation></LoadingAnimation>}>
    <Portfolio />
  </Suspense>
);

export default PortfolioLazy;
