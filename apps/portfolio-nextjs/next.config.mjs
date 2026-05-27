/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Docker/nginx deployment
  reactStrictMode: true,
  compress: true,
  transpilePackages: ['@notadream/react'],

  // Security and caching headers for SEO optimization
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Cache static assets for 1 year
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images for 1 year
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO (permanent redirects)
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  env: {
    NEXT_PUBLIC_APP_TITLE: process.env.NEXT_PUBLIC_APP_TITLE || 'Portfolio',
    NEXT_PUBLIC_APP_DESCRIPTION:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Portfolio of Mr. Nabin Dhital',
    NEXT_PUBLIC_APP_KEYWORDS:
      process.env.NEXT_PUBLIC_APP_KEYWORDS ||
      'Software developer, React, NodeJs, MERN stack',
    NEXT_PUBLIC_APP_AUTHOR: process.env.NEXT_PUBLIC_APP_AUTHOR || 'Nabin Dhital',
    NEXT_PUBLIC_APP_THEME_COLOR: process.env.NEXT_PUBLIC_APP_THEME_COLOR || '#000000',
    NEXT_PUBLIC_BASE_APP_URL: process.env.NEXT_PUBLIC_BASE_APP_URL || '',
    NEXT_PUBLIC_APP_LINKEDIN_URL: process.env.NEXT_PUBLIC_APP_LINKEDIN_URL || '',
    NEXT_PUBLIC_APP_GITHUB_URL: process.env.NEXT_PUBLIC_APP_GITHUB_URL || '',
    NEXT_PUBLIC_APP_TWITTER_URL: process.env.NEXT_PUBLIC_APP_TWITTER_URL || '',
    NEXT_PUBLIC_APP_FACEBOOK_URL: process.env.NEXT_PUBLIC_APP_FACEBOOK_URL || '',
    NEXT_PUBLIC_APP_INSTAGRAM_URL: process.env.NEXT_PUBLIC_APP_INSTAGRAM_URL || '',
    NEXT_PUBLIC_APP_YOUTUBE_URL: process.env.NEXT_PUBLIC_APP_YOUTUBE_URL || '',
    NEXT_PUBLIC_APP_PINTEREST_URL: process.env.NEXT_PUBLIC_APP_PINTEREST_URL || '',
    NEXT_PUBLIC_APP_WHATSAPP_URL: process.env.NEXT_PUBLIC_APP_WHATSAPP_URL || '',
    NEXT_PUBLIC_APP_TWITTER_HANDLE: process.env.NEXT_PUBLIC_APP_TWITTER_HANDLE || '',
  },
};

export default nextConfig;
