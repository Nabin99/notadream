import type { Metadata } from 'next';

import { About } from './About';

export const dynamic = 'force-static';

const baseUrl = process.env.NEXT_PUBLIC_BASE_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'About Me - Full-Stack Developer & SEO Specialist',
  description:
    'Learn more about Nabin Dhital, a passionate Full-Stack Developer with expertise in Web Development, Mobile App Development, and SEO Services. Discover my journey, skills, and experience.',
  keywords: [
    'About Nabin Dhital',
    'Full-Stack Developer',
    'Software Engineer',
    'Web Developer',
    'Tech Professional',
    'Developer Background',
    'Developer Experience',
    'Technical Skills',
  ],
  openGraph: {
    title: 'About Me - Full-Stack Developer & SEO Specialist',
    description:
      'Learn more about Nabin Dhital, a passionate Full-Stack Developer with expertise in Web Development, Mobile App Development, and SEO Services.',
    type: 'website',
    url: `${baseUrl}/about`,
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'About Nabin Dhital - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Me - Full-Stack Developer & SEO Specialist',
    description:
      'Learn more about Nabin Dhital, a passionate Full-Stack Developer with expertise in Web Development, Mobile App Development, and SEO Services.',
    images: ['/preview.png'],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutPage() {
  return <About />;
}

