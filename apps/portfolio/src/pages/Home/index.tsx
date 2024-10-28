import { Page } from "@notadream/react";

import { HeroSection } from "./components";
import ServiceSection from "./components/ServiceSection";

export const Home = () => {
  return (
    <Page className="home">
      <HeroSection />
      <ServiceSection />
    </Page>
  );
};
