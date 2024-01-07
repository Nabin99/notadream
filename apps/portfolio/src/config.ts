import { configureApp } from "@notadream/react";

configureApp({
  appName: import.meta.env.VITE_APP_NAME as string,
  appTitle: import.meta.env.VITE_APP_TITLE as string,
  appDescription: import.meta.env.VITE_APP_DESCRIPTION as string,
  appKeywords: import.meta.env.VITE_APP_KEYWORDS as string,
  apiBaseURL: import.meta.env.VITE_API_BASE_URL as string,
  appPort: Number(import.meta.env.VITE_APP_PORT) || 4003,
  websiteDomain: window.location.hostname,
  copyright: {
    holder: import.meta.env.VITE_COPYRIGHT_HOLDER as string,
  },
  version: import.meta.env.VITE_VERSION as string,
});
