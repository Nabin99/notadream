'use client';

import { Page } from '@notadream/react';

import { HeroSection } from './components/home-components';
import { HowSection } from './components/home-components/HowSection';
import { ServiceSection } from './components/home-components/ServiceSection';
import { WhySection } from './components/home-components/WhySection';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <Page className="home">
      <HeroSection />
      <WhySection />
      <HowSection />
      <ServiceSection />
    </Page>
  );
}
