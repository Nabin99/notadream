import { AboutContent } from './about-content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Me',
  description: 'Learn more about Nabin Dhital and my journey as a software developer.',
};

export default function AboutPage() {
  return <AboutContent />;
}
