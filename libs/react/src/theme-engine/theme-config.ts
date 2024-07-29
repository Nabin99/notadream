import { generateCss } from "./classes/generate-css";
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
  MappedVariables,
} from "./type";

interface ThemeConfigProvider {
  getDefaultTheme: () => keyof Themes;
  getThemes: () => Readonly<Themes>;
  getDefaultColorScheme: () => ColorScheme;
  getDefaultThemeMode: () => ThemeMode;
  getThemeConfig: () => Readonly<ThemeConfig>;
  getGeneratedCSSVariables: () => Readonly<MappedVariables> | undefined;
  getGeneratedCSS: () => Readonly<string>;
  setDefaultTheme: (defaultTheme: keyof Themes) => ThemeConfigProvider;
  setThemes: (themes: Themes) => ThemeConfigProvider;
  setDefaultColorScheme: (
    defaultColorScheme: ColorScheme
  ) => ThemeConfigProvider;
  setThemeConfig: (themeConfig: Partial<ThemeConfig>) => ThemeConfigProvider;
  initTheme: () => void;
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
    mappedVariables: undefined,
  };

  const themeConfigMethods: ThemeConfigProvider = {
    getDefaultColorScheme: () => themeConfig.defaultColorScheme,
    getDefaultTheme: () => themeConfig.defaultTheme,
    getDefaultThemeMode: () => themeConfig.defaultThemeMode,
    getThemeConfig: () => themeConfig,
    getThemes: () => themeConfig.themes,
    getGeneratedCSSVariables: () => themeConfig.mappedVariables,
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
      const { generatedVariablesString, mappedGeneratedCSSVariables } =
        generateCSSVariableFromThemeKey(
          themeConfig.themes[themeConfig.defaultTheme],
          themeConfig.cssVariablePrefix,
          themeConfig.cssVariablePrefix,
          themeConfig.defaultColorScheme
        );

      const generatedCss = generateCss(generatedVariablesString);

      themeConfig.mappedVariables = mappedGeneratedCSSVariables;
      themeConfig.generatedCSS = generatedCss;

      if (window) {
        const component = document.createElement("style");
        component.innerHTML = generatedCss;
        document.head.appendChild(component);
      }

      return;
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
  getGeneratedCSSVariables,
} = ThemeConfigProvider();
