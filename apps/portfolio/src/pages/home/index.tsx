import { Page } from "@notadream/react";

import { HeroSection } from "./components";
import { HowSection } from "./components/HowSection";
import { ServiceSection } from "./components/ServiceSection";
import { WhySection } from "./components/WhySection";

export const Home = () => {
  return (
    <Page className="home">
      <HeroSection />
      <WhySection />
      <HowSection />
      <ServiceSection />
    </Page>
  );
};
