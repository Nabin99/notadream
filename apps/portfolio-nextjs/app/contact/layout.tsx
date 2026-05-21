import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Contact Me - Get in Touch',
  description:
    'Contact Nabin Dhital for Web Development, Mobile App Development, and SEO Services. Reach out to discuss your project requirements and how I can help.',
  keywords: [
    'Contact',
    'Get in Touch',
    'Hire Developer',
    'Work Inquiry',
    'Project Consultation',
    'Web Development Services',
    'SEO Services',
    'Freelance Developer',
  ],
  openGraph: {
    title: 'Contact Me - Get in Touch',
    description:
      'Contact Nabin Dhital for Web Development, Mobile App Development, and SEO Services.',
    type: 'website',
    url: `${baseUrl}/contact`,
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Contact Nabin Dhital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Me - Get in Touch',
    description: 'Contact Nabin Dhital for Web Development, Mobile App Development, and SEO Services.',
    images: ['/preview.png'],
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
