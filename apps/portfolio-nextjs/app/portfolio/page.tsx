import { Portfolio } from './Portfolio';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Portfolio - My Projects',
  description: 'View my portfolio of completed projects and work experience.',
};

export default function PortfolioPage() {
  return <Portfolio />;
}
