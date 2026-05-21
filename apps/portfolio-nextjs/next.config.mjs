/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  transpilePackages: ['@notadream/react'],
  env: {
    NEXT_PUBLIC_APP_TITLE: process.env.NEXT_PUBLIC_APP_TITLE || "Portfolio",
    NEXT_PUBLIC_APP_DESCRIPTION:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Portfolio of Mr. Nabin Dhital",
    NEXT_PUBLIC_APP_KEYWORDS:
      process.env.NEXT_PUBLIC_APP_KEYWORDS ||
      "Software developer, React, NodeJs, MERN stack",
    NEXT_PUBLIC_APP_AUTHOR: process.env.NEXT_PUBLIC_APP_AUTHOR || "Nabin Dhital",
    NEXT_PUBLIC_APP_THEME_COLOR: process.env.NEXT_PUBLIC_APP_THEME_COLOR || "#000000",
    NEXT_PUBLIC_BASE_APP_URL: process.env.NEXT_PUBLIC_BASE_APP_URL || "",
    NEXT_PUBLIC_APP_LINKEDIN_URL: process.env.NEXT_PUBLIC_APP_LINKEDIN_URL || "",
    NEXT_PUBLIC_APP_GITHUB_URL: process.env.NEXT_PUBLIC_APP_GITHUB_URL || "",
    NEXT_PUBLIC_APP_TWITTER_URL: process.env.NEXT_PUBLIC_APP_TWITTER_URL || "",
    NEXT_PUBLIC_APP_FACEBOOK_URL: process.env.NEXT_PUBLIC_APP_FACEBOOK_URL || "",
    NEXT_PUBLIC_APP_INSTAGRAM_URL: process.env.NEXT_PUBLIC_APP_INSTAGRAM_URL || "",
    NEXT_PUBLIC_APP_YOUTUBE_URL: process.env.NEXT_PUBLIC_APP_YOUTUBE_URL || "",
    NEXT_PUBLIC_APP_PINTEREST_URL: process.env.NEXT_PUBLIC_APP_PINTEREST_URL || "",
    NEXT_PUBLIC_APP_WHATSAPP_URL: process.env.NEXT_PUBLIC_APP_WHATSAPP_URL || "",
    NEXT_PUBLIC_APP_TWITTER_HANDLE: process.env.NEXT_PUBLIC_APP_TWITTER_HANDLE || "",
  },
};

export default nextConfig;
