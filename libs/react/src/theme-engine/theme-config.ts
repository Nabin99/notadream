import {
  defaultThemingVariables,
  generateCSSVariableFromThemeKey,
} from "./vars";
import { getAppConfig } from "../config";
import { deepUpdateObject } from "../utils";

import type { ThemeConfig, Themes, ThemeMode, Theme } from "./type";

interface ThemeConfigProvider {
  getDefaultThemeKey: () => keyof Themes;
  getThemes: () => Readonly<Themes>;
  getDefaultThemeMode: () => ThemeMode;
  getThemeConfig: () => Readonly<ThemeConfig>;
  getGeneratedCSS: () => Readonly<string>;
  setDefaultTheme: (defaultThemeKey: keyof Themes) => ThemeConfigProvider;
  setThemes: (themes: Themes) => ThemeConfigProvider;
  setThemeConfig: (themeConfig: Partial<ThemeConfig>) => ThemeConfigProvider;
  initTheme: () => void;
  updateTheme: (
    themeToLoad: Theme,
    mode: ThemeMode,
    onlyColor: boolean
  ) => void;
}

const ThemeConfigProvider = (): ThemeConfigProvider => {
  const themeConfig: ThemeConfig = {
    defaultThemeKey: "notadream",
    defaultMode: "auto",
    themes: {
      notadream: { ...defaultThemingVariables },
    },
    cssVariablePrefix: "nd",
    generatedCSS: "",
  };

  const themeConfigMethods: ThemeConfigProvider = {
    getDefaultThemeKey: () => themeConfig.defaultThemeKey,
    getDefaultThemeMode: () => themeConfig.defaultMode,
    getThemeConfig: () => themeConfig,
    getThemes: () => themeConfig.themes,
    getGeneratedCSS: () => themeConfig.generatedCSS,
    setDefaultTheme: (defaultThemeKey: keyof Themes) => {
      themeConfig.defaultThemeKey = defaultThemeKey;

      return themeConfigMethods;
    },
    setThemes: (themes: Themes) => {
      themeConfig.themes = { ...themeConfig.themes, ...themes };

      return themeConfigMethods;
    },
    setThemeConfig: (config) => {
      deepUpdateObject(themeConfig, config);

      return themeConfigMethods;
    },
    initTheme: () => {
      const localStorageName = getAppConfig().theme.localStorageName;

      if (!localStorage.getItem(localStorageName)) {
        localStorage.setItem(
          localStorageName,
          JSON.stringify({
            themeKey: themeConfig.defaultThemeKey,
            mode: themeConfig.defaultMode,
          })
        );
      }

      const themeStored = JSON.parse(
        localStorage.getItem(localStorageName) || "{}"
      );

      let colorScheme: Omit<ThemeMode, "auto">;

      if (themeStored?.mode !== "auto") {
        colorScheme = themeStored?.mode;
      } else if (themeConfig.defaultMode !== "auto") {
        colorScheme = themeConfig.defaultMode;
      } else {
        colorScheme = window.matchMedia("(prefers-color-scheme: dark)")
          ? "dark"
          : "light";
      }

      const {
        generatedColorVariablesString,
        generatedNonColorVariablesString,
      } = generateCSSVariableFromThemeKey(
        themeConfig.themes[
          (themeStored?.themeKey as keyof Themes) || themeConfig.defaultThemeKey
        ],
        themeConfig.cssVariablePrefix,
        themeConfig.cssVariablePrefix,
        colorScheme
      );

      themeConfig.generatedCSS = `:root{${generatedColorVariablesString}${generatedNonColorVariablesString}}`;

      if (window) {
        const colorComponent = document.createElement("style");
        colorComponent.setAttribute("id", "css-color-variables");
        colorComponent.setAttribute("type", "text/css");
        colorComponent.innerHTML = `:root{${generatedColorVariablesString}}`;
        document.head.appendChild(colorComponent);

        const nonColorComponent = document.createElement("style");
        nonColorComponent.setAttribute("id", "css-non-color-variables");
        nonColorComponent.setAttribute("type", "text/css");
        nonColorComponent.innerHTML = `:root{${generatedNonColorVariablesString}}`;
        document.head.appendChild(nonColorComponent);
      }

      return;
    },

    updateTheme: (themeToLoad, mode, onlyColor) => {
      const colorScheme =
        mode !== "auto"
          ? mode
          : window.matchMedia("(prefers-color-scheme: dark)")
            ? "dark"
            : "light";
      const {
        generatedColorVariablesString,
        generatedNonColorVariablesString,
      } = generateCSSVariableFromThemeKey(
        themeToLoad,
        themeConfig.cssVariablePrefix,
        themeConfig.cssVariablePrefix,
        colorScheme,
        onlyColor
      );

      if (window) {
        const colorComponent = document.querySelector("#css-color-variables");
        colorComponent &&
          (colorComponent.innerHTML = `:root{${generatedColorVariablesString}}`);

        if (!onlyColor) {
          const nonColorComponent = document.querySelector(
            "#css-non-color-variables"
          );
          nonColorComponent &&
            (nonColorComponent.innerHTML =
              `:root{${generatedNonColorVariablesString}}` || "");
        }
      }

      const localStorageName = getAppConfig().theme.localStorageName;
      const themeStored = JSON.parse(
        localStorage.getItem(localStorageName) || "{}"
      );

      localStorage.setItem(
        localStorageName,
        JSON.stringify({
          mode: mode,
          themeKey: themeStored?.themeKey,
        })
      );
    },
  };

  return themeConfigMethods;
};

export const {
  getDefaultThemeKey,
  getDefaultThemeMode,
  getThemeConfig,
  getThemes,
  setDefaultTheme,
  setThemeConfig,
  setThemes,
  getGeneratedCSS,
  updateTheme,
} = ThemeConfigProvider();
