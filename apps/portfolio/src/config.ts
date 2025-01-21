import { configureApp } from "@notadream/react";

declare module "@notadream/react" {
  interface AppConfig {
    appEmail: string;
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
  theme: {
    localStorageName: "theme",
  },
  websiteDomain: window.location.hostname,
  copyright: {
    holder: import.meta.env.VITE_COPYRIGHT_HOLDER || "",
  },
  version: import.meta.env.VITE_VERSION || "",
});
