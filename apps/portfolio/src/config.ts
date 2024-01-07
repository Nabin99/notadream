import { configureApp } from "@notadream/react";

configureApp({
  appName: "Notadream",
  appTitle: "Not a dream good",
  appDescription: "This is a example portfolio app.",
  appKeywords: "notadream",
  apiBaseURL: "localhost:4000",
  appPort: 4003,
  websiteDomain: window.location.hostname,
  copyright: {
    holder: "Notadream",
  },
  version: "0.1.0",
});
