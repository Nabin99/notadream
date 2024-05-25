import { ThemeProvider, setThemeConfig } from "@notadream/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./assets/index.css";
import "./config";
declare module "@notadream/react" {
  interface ClassScheme {
    secondaryButton: React.CSSProperties;
  }
}

setThemeConfig({
  defaultColorScheme: "light",
  defaultTheme: "notadream",
}).initTheme({
  secondaryButton: {
    color: "red",
    backgroundColor: "green",
  },
});

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
