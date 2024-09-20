import { configureApp } from "@notadream/react";

configureApp({
  appName: import.meta.env.VITE_APP_NAME || "",
  appTitle: import.meta.env.VITE_APP_TITLE || "",
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || "",
  appKeywords: import.meta.env.VITE_APP_KEYWORDS || "",
  appLogo: import.meta.env.VITE_APP_LOGO || "",
  apiBaseURL: import.meta.env.VITE_API_BASE_URL || "",
  appPort: Number(import.meta.env.VITE_APP_PORT) || 4003,
  websiteDomain: window.location.hostname,
  copyright: {
    holder: import.meta.env.VITE_COPYRIGHT_HOLDER || "",
  },
  version: import.meta.env.VITE_VERSION || "",
});
