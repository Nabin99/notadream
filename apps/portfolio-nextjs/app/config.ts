"use client";

import { configureApp } from "@notadream/react";

declare module "@notadream/react" {
  interface ThemeOptions {
    multiColorMode: boolean;
  }

  interface AppConfig {
    appEmail: string;
    secrets: {
      emailJsServiceId: string;
      emailJsTemplateId: string;
      emailJsUserId: string;
    };
    socialLinks: {
      facebook: string;
      github: string;
      instagram: string;
      linkedin: string;
      twitter: string;
    };
  }
}

configureApp({
  appName: process.env.NEXT_PUBLIC_APP_TITLE || "",
  appTitle: process.env.NEXT_PUBLIC_APP_TITLE || "",
  appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "",
  appKeywords: process.env.NEXT_PUBLIC_APP_KEYWORDS || "",
  appLogo: process.env.NEXT_PUBLIC_APP_LOGO || "",
  apiBaseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  appPort: Number(process.env.NEXT_PUBLIC_APP_PORT) || 3000,
  appEmail: process.env.NEXT_PUBLIC_APP_EMAIL || "dhitalnabin224@gmail.com",
  i18n: {
    defaultLanguage: process.env.NEXT_PUBLIC_I18N_DEFAULT_LANGUAGE || "en",
    supportedLanguages: (
      process.env.NEXT_PUBLIC_I18N_SUPPORTED_LANGUAGE || "en, fr"
    )
      .replaceAll(", ", ",")
      .split(","),
    localStorageName: "i18n",
  },
  secrets: {
    emailJsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    emailJsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
    emailJsUserId: process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "",
  },
  socialLinks: {
    facebook: process.env.NEXT_PUBLIC_APP_FACEBOOK_URL || "",
    github: process.env.NEXT_PUBLIC_APP_GITHUB_URL || "",
    instagram: process.env.NEXT_PUBLIC_APP_INSTAGRAM_URL || "",
    linkedin: process.env.NEXT_PUBLIC_APP_LINKEDIN_URL || "",
    twitter: process.env.NEXT_PUBLIC_APP_TWITTER_URL || "",
  },
  theme: {
    localStorageName: "theme",
    multiColorMode:
      process.env.NEXT_PUBLIC_APP_THEME_MULTI_COLOR_MODE === "true",
  },
  websiteDomain:
    typeof window !== "undefined" ? window.location.hostname : "localhost",
  copyright: {
    holder: process.env.NEXT_PUBLIC_APP_AUTHOR || "",
  },
  version: process.env.NEXT_PUBLIC_VERSION || "",
});
