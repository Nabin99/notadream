import { Providers } from "./providers";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || "Portfolio",
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Portfolio of Mr. Nabin Dhital",
  keywords:
    process.env.NEXT_PUBLIC_APP_KEYWORDS ||
    "Software developer, React, NodeJs, MERN stack",
  authors: [{ name: process.env.NEXT_PUBLIC_APP_AUTHOR || "Nabin Dhital" }],
  creator: process.env.NEXT_PUBLIC_APP_AUTHOR || "Nabin Dhital",
  openGraph: {
    title: process.env.NEXT_PUBLIC_APP_TITLE || "Portfolio",
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "Portfolio of Mr. Nabin Dhital",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content={process.env.NEXT_PUBLIC_APP_THEME_COLOR || "#000000"}
        />
        <link rel="icon" href="/nabin-logo.svg" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
