import type { Metadata } from 'next';

import { Portfolio } from './Portfolio';

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Portfolio - Web Development & Mobile App Projects',
  description:
    'Explore my portfolio showcasing Web Development, Mobile App Development, and SEO projects. View completed projects, technical implementations, and real-world solutions.',
  keywords: [
    'Portfolio',
    'Projects',
    'Web Development Projects',
    'Mobile App Projects',
    'React Projects',
    'Node.js Projects',
    'Full Stack Projects',
    'Case Studies',
    'Work Examples',
  ],
  openGraph: {
    title: 'Portfolio - Web Development & Mobile App Projects',
    description:
      'Explore my portfolio showcasing Web Development, Mobile App Development, and SEO projects. View completed projects, technical implementations, and real-world solutions.',
    type: 'website',
    url: `${baseUrl}/portfolio`,
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Nabin Dhital Portfolio - Web & Mobile App Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Web Development & Mobile App Projects',
    description:
      'Explore my portfolio showcasing Web Development, Mobile App Development, and SEO projects.',
    images: ['/preview.png'],
  },
  alternates: {
    canonical: `${baseUrl}/portfolio`,
  },
};

export default function PortfolioPage() {
  return <Portfolio />;
}

