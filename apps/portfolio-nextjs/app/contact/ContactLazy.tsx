import { lazy, Suspense } from "react";

import { LoadingAnimation } from "../components";

const Contact = lazy(() => import("./Contact"));

const ContactLazy = () => (
  <Suspense fallback={<LoadingAnimation></LoadingAnimation>}>
    <Contact />
  </Suspense>
);

export default ContactLazy;
