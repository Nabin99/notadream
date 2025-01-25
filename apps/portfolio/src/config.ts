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
  appName: import.meta.env.VITE_APP_NAME || "",
  appTitle: import.meta.env.VITE_APP_TITLE || "",
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || "",
  appKeywords: import.meta.env.VITE_APP_KEYWORDS || "",
  appLogo: import.meta.env.VITE_APP_LOGO || "",
  apiBaseURL: import.meta.env.VITE_API_BASE_URL || "",
  appPort: Number(import.meta.env.VITE_APP_PORT) || 4003,
  appEmail: import.meta.env.VITE_APP_EMAIL || "dhitalnabin224@gmail.com",
  i18n: {
    defaultLanguage: import.meta.env.VITE_I18N_DEFAULT_LANGUAGE || "en",
    supportedLanguages: (
      import.meta.env.VITE_I18N_SUPPORTED_LANGUAGE || "en, ne"
    )
      .replaceAll(", ", ",")
      .split(","),
    localStorageName: "i18n",
  },
  secrets: {
    emailJsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
    emailJsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    emailJsUserId: import.meta.env.VITE_EMAILJS_USER_ID || "",
  },
  socialLinks: {
    facebook: import.meta.env.VITE_APP_FACEBOOK_URL || "",
    github: import.meta.env.VITE_APP_GITHUB_URL || "",
    instagram: import.meta.env.VITE_APP_INSTAGRAM_URL || "",
    linkedin: import.meta.env.VITE_APP_LINKEDIN_URL || "",
    twitter: import.meta.env.VITE_APP_TWITTER_URL || "",
  },
  theme: {
    localStorageName: "theme",
    multiColorMode: import.meta.env.VITE_APP_THEME_MULTI_COLOR_MODE === "true",
  },
  websiteDomain: window.location.hostname,
  copyright: {
    holder: import.meta.env.VITE_COPYRIGHT_HOLDER || "",
  },
  version: import.meta.env.VITE_VERSION || "",
});
