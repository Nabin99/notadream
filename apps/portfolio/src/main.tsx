import { I18nProvider, ThemeProvider, setThemeConfig } from "@notadream/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { TranslationsEntry } from "./i18n";

import "./assets/css/index.css";
import "./config";

setThemeConfig({
  defaultThemeKey: "notadream",
}).initTheme();

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider translations={TranslationsEntry}>
        <App />
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
);
