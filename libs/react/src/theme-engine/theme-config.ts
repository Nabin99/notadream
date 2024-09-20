import {
  defaultThemingVariables,
  generateCSSVariableFromThemeKey,
} from "./vars";
import { deepUpdateObject } from "../utils";

import type {
  ColorScheme,
  ThemeConfig,
  Themes,
  ThemeMode,
  Theme,
} from "./type";

interface ThemeConfigProvider {
  getDefaultTheme: () => keyof Themes;
  getThemes: () => Readonly<Themes>;
  getDefaultColorScheme: () => ColorScheme;
  getDefaultThemeMode: () => ThemeMode;
  getThemeConfig: () => Readonly<ThemeConfig>;
  getGeneratedCSS: () => Readonly<string>;
  setDefaultTheme: (defaultTheme: keyof Themes) => ThemeConfigProvider;
  setThemes: (themes: Themes) => ThemeConfigProvider;
  setDefaultColorScheme: (
    defaultColorScheme: ColorScheme
  ) => ThemeConfigProvider;
  setThemeConfig: (themeConfig: Partial<ThemeConfig>) => ThemeConfigProvider;
  initTheme: () => void;
  updateTheme: (
    themeToLoad: Theme,
    colorScheme: ColorScheme,
    onlyColor: boolean
  ) => void;
}

const ThemeConfigProvider = (): ThemeConfigProvider => {
  const themeConfig: ThemeConfig = {
    defaultColorScheme: "light",
    defaultTheme: "notadream",
    defaultThemeMode: "auto",
    themes: {
      notadream: { ...defaultThemingVariables },
    },
    cssVariablePrefix: "nd",
    generatedCSS: "",
  };

  const themeConfigMethods: ThemeConfigProvider = {
    getDefaultColorScheme: () => themeConfig.defaultColorScheme,
    getDefaultTheme: () => themeConfig.defaultTheme,
    getDefaultThemeMode: () => themeConfig.defaultThemeMode,
    getThemeConfig: () => themeConfig,
    getThemes: () => themeConfig.themes,
    getGeneratedCSS: () => themeConfig.generatedCSS,
    setDefaultColorScheme: (defaultColorScheme: ColorScheme) => {
      themeConfig.defaultColorScheme = defaultColorScheme;

      return themeConfigMethods;
    },
    setDefaultTheme: (defaultTheme: keyof Themes) => {
      themeConfig.defaultTheme = defaultTheme;

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
      const {
        generatedColorVariablesString,
        generatedNonColorVariablesString,
      } = generateCSSVariableFromThemeKey(
        themeConfig.themes[themeConfig.defaultTheme],
        themeConfig.cssVariablePrefix,
        themeConfig.cssVariablePrefix,
        themeConfig.defaultColorScheme
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

    updateTheme: (themeToLoad, colorScheme, onlyColor) => {
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
    },
  };

  return themeConfigMethods;
};

export const {
  getDefaultColorScheme,
  getDefaultTheme,
  getDefaultThemeMode,
  getThemeConfig,
  getThemes,
  setDefaultColorScheme,
  setDefaultTheme,
  setThemeConfig,
  setThemes,
  getGeneratedCSS,
  updateTheme,
} = ThemeConfigProvider();
