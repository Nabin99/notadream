import {
  defaultThemingVariables,
  generateCSSVariableFromThemeKey,
} from "./vars";
import { deepUpdateObject } from "../utils";

import type {
  ColorScheme,
  ThemeConfig,
  Themes,
  Theme,
  ThemeMode,
} from "./type";

interface ThemeConfigProvider {
  getDefaultTheme: () => keyof Themes;
  getThemes: () => Readonly<Themes>;
  getDefaultColorScheme: () => ColorScheme;
  getDefaultThemeMode: () => ThemeMode;
  getThemeConfig: () => Readonly<ThemeConfig>;
  getCSSVariableNaming: (theme?: keyof Themes) => Readonly<Theme>;
  setDefaultTheme: (defaultTheme: keyof Themes) => ThemeConfigProvider;
  setThemes: (themes: Themes) => ThemeConfigProvider;
  setDefaultColorScheme: (
    defaultColorScheme: ColorScheme
  ) => ThemeConfigProvider;
  setThemeConfig: (themeConfig: Partial<ThemeConfig>) => ThemeConfigProvider;
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
  };
  const themeConfigMethods: ThemeConfigProvider = {
    getDefaultColorScheme: () => themeConfig.defaultColorScheme,
    getDefaultTheme: () => themeConfig.defaultTheme,
    getDefaultThemeMode: () => themeConfig.defaultThemeMode,
    getThemeConfig: () => themeConfig,
    getThemes: () => themeConfig.themes,
    getCSSVariableNaming: (theme = "notadream") => {
      return generateCSSVariableFromThemeKey<Theme>(
        themeConfig.themes[theme],
        themeConfig.cssVariablePrefix
      );
    },
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
  getCSSVariableNaming,
} = ThemeConfigProvider();
