import { I18nProvider, ThemeProvider, setThemeConfig } from "@notadream/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./assets/index.css";
import "./config";

setThemeConfig({
  defaultThemeKey: "notadream",
}).initTheme();

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider translations={{}}>
        <App />
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
);
