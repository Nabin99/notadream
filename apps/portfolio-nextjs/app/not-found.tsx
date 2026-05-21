import type { Metadata } from 'next';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Page Not Found - 404',
  description: 'The page you are looking for does not exist. Return to the homepage or explore other sections.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${baseUrl}/404`,
  },
};

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        gap: '20px',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.5rem', margin: 0 }}>Page Not Found</p>
      <p style={{ margin: 0, color: '#666' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" style={{ marginTop: '20px', color: '#16c7d5' }}>
        Return to Home
      </Link>
    </div>
  );
}
