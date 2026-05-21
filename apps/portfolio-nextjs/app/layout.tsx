import { Mitr, Sofadi_One } from "next/font/google";
import { Providers } from "./providers";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

const mitrFont = Mitr({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mitr",
});

const sofadiFont = Sofadi_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sofadi",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_APP_URL || "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: process.env.NEXT_PUBLIC_APP_THEME_COLOR || "#16c7d5",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default:
      process.env.NEXT_PUBLIC_APP_TITLE ||
      "Nabin Dhital | Full-Stack Developer & SEO Specialist",
    template: `%s | ${process.env.NEXT_PUBLIC_APP_TITLE || "Nabin Dhital"}`,
  },
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "A creative and dynamic Full-Stack Developer portfolio showcasing expertise in web development, mobile app development, and SEO-based services.",
  keywords: [
    "Full-Stack Developer",
    "Web Development",
    "Mobile App Development",
    "SEO Services",
    "React",
    "JavaScript",
    "CSS",
    "HTML",
    "Node.js",
    "TypeScript",
    "Fastify",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Portfolio",
    "Freelance Developer",
    "Software Engineer",
  ],
  authors: [{ name: process.env.NEXT_PUBLIC_APP_AUTHOR || "Nabin Dhital" }],
  creator: process.env.NEXT_PUBLIC_APP_AUTHOR || "Nabin Dhital",
  publisher: process.env.NEXT_PUBLIC_APP_AUTHOR || "Nabin Dhital",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title:
      process.env.NEXT_PUBLIC_APP_TITLE ||
      "Nabin Dhital | Full-Stack Developer & SEO Specialist",
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "A creative and dynamic Full-Stack Developer portfolio showcasing expertise in web development, mobile app development, and SEO-based services.",
    type: "website",
    url: baseUrl,
    siteName: process.env.NEXT_PUBLIC_APP_AUTHOR || "Nabin Dhital",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_APP_AUTHOR || "Nabin Dhital"}'s Portfolio Preview`,
        type: "image/png",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      process.env.NEXT_PUBLIC_APP_TITLE ||
      "Nabin Dhital | Full-Stack Developer & SEO Specialist",
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "A creative and dynamic Full-Stack Developer portfolio showcasing expertise in web development, mobile app development, and SEO-based services.",
    images: ["/preview.png"],
    creator: process.env.NEXT_PUBLIC_APP_TWITTER_HANDLE || "@dhitalnabin111",
    site: process.env.NEXT_PUBLIC_APP_TWITTER_HANDLE || "@dhitalnabin111",
  },
  icons: {
    icon: "/nabin-logo.svg",
    shortcut: "/nabin-logo.svg",
    apple: "/nabin-logo.svg",
  },
  category: "portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const author = process.env.NEXT_PUBLIC_APP_AUTHOR || "Nabin Dhital";
  const description =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "A creative and dynamic Full-Stack Developer portfolio showcasing expertise in web development, mobile app development, and SEO-based services.";
  const linkedIn =
    process.env.NEXT_PUBLIC_APP_LINKEDIN_URL ||
    "https://www.linkedin.com/in/dhitalnabin";
  const github =
    process.env.NEXT_PUBLIC_APP_GITHUB_URL || "https://github.com/Nabin99";
  const twitter =
    process.env.NEXT_PUBLIC_APP_TWITTER_URL ||
    "https://twitter.com/dhitalnabin111";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author,
    jobTitle: "Full Stack Developer & SEO Specialist",
    description,
    url: baseUrl,
    image: `${baseUrl}/preview.png`,
    email: process.env.NEXT_PUBLIC_APP_EMAIL || "dhitalnabin224@gmail.com",
    sameAs: [linkedIn, github, twitter],
    worksFor: {
      "@type": "Organization",
      name: "Full Stack Developer",
    },
    knowsAbout: [
      "Web Development",
      "Full Stack Development",
      "React",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "SEO",
      "Mobile Development",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Tribhuvan University",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mitrFont.variable} ${sofadiFont.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/nabin-logo.svg" />
        <link rel="apple-touch-icon" href="/nabin-logo.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
