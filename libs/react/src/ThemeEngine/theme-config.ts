import { getClassesDefinition } from "./classes";
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
  ClassScheme,
} from "./type";

interface ThemeConfigProvider {
  getDefaultTheme: () => keyof Themes;
  getThemes: () => Readonly<Themes>;
  getDefaultColorScheme: () => ColorScheme;
  getDefaultThemeMode: () => ThemeMode;
  getThemeConfig: () => Readonly<ThemeConfig>;
  getGeneratedCSSVariables: () => Readonly<MappedVariables> | undefined;
  getGeneratedClassName: () =>
    | Readonly<Record<keyof ClassScheme, string>>
    | undefined;
  getGeneratedCSS: () => Readonly<string>;
  setDefaultTheme: (defaultTheme: keyof Themes) => ThemeConfigProvider;
  setThemes: (themes: Themes) => ThemeConfigProvider;
  setDefaultColorScheme: (
    defaultColorScheme: ColorScheme
  ) => ThemeConfigProvider;
  setThemeConfig: (themeConfig: Partial<ThemeConfig>) => ThemeConfigProvider;
  initTheme: (extendClassDefinition?: Partial<ClassScheme>) => void;
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
    mappedClassNames: undefined,
  };

  const themeConfigMethods: ThemeConfigProvider = {
    getDefaultColorScheme: () => themeConfig.defaultColorScheme,
    getDefaultTheme: () => themeConfig.defaultTheme,
    getDefaultThemeMode: () => themeConfig.defaultThemeMode,
    getThemeConfig: () => themeConfig,
    getThemes: () => themeConfig.themes,
    getGeneratedCSSVariables: () => themeConfig.mappedVariables,
    getGeneratedClassName: () => themeConfig.mappedClassNames,
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
    initTheme: (extendClassDefinition?: Partial<ClassScheme>) => {
      const { generatedVariablesString, mappedGeneratedCSSVariables } =
        generateCSSVariableFromThemeKey(
          themeConfig.themes[themeConfig.defaultTheme],
          themeConfig.cssVariablePrefix,
          themeConfig.cssVariablePrefix,
          themeConfig.defaultColorScheme
        );

      const { generatedCss, mappedClassNames } = generateCss(
        {
          ...getClassesDefinition(mappedGeneratedCSSVariables),
          ...extendClassDefinition,
        },
        generatedVariablesString,
        themeConfig.cssVariablePrefix
      );

      themeConfig.mappedClassNames = mappedClassNames;
      themeConfig.mappedVariables = mappedGeneratedCSSVariables;
      themeConfig.generatedCSS = generatedCss;

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
  getGeneratedClassName,
} = ThemeConfigProvider();
