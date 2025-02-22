import { lazy, Suspense } from "react";

import { LoadingAnimation } from "../../components/LoadingAnimation";

const About = lazy(() => import("./About"));

const AboutLazy = () => (
  <Suspense fallback={<LoadingAnimation></LoadingAnimation>}>
    <About />
  </Suspense>
);

export default AboutLazy;
