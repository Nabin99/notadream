export interface ColorVariation {
  dark: string;
  light: string;
}

export interface Colors {
  primary: ColorVariation;
  secondary: ColorVariation;
  success: ColorVariation;
  danger: ColorVariation;
  warning: ColorVariation;
  info: ColorVariation;
  background: ColorVariation;
  text: ColorVariation;
  textLight: ColorVariation;
  textMuted: ColorVariation;
  link: ColorVariation;
  linkHover: ColorVariation;
  border: ColorVariation;
  placeholder: ColorVariation;
  disabled: ColorVariation;
  white: ColorVariation;
  black: ColorVariation;
}

export interface FontFamily {
  text: string;
  heading: string;
}

export interface FontSizes {
  base: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  small: string;
  caption: string;
}

export interface FontWeights extends FontSizes {}
export interface LineHeight extends FontSizes {}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface BorderRadius {
  sm: string;
  md: string;
  lg: string;
  pill: string;
}

export interface BoxShadow {
  sm: string;
  md: string;
  lg: string;
}

export interface ZIndex {
  dropdown: string;
  sticky: string;
  fixed: string;
  modalBackdrop: string;
  modal: string;
  popover: string;
  tooltip: string;
}

export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Theme {
  colors: Colors;
  fontFamily: FontFamily;
  fontSizes: FontSizes;
  fontWeight: FontWeights;
  lineHeight: LineHeight;
  spacing: Spacing;
  borderRadius: BorderRadius;
  boxShadow: BoxShadow;
  zIndex: ZIndex;
  breakpoints: Breakpoints;
}

export interface Themes {
  notadream: Theme;
}

export type ThemeMode = "dark" | "light" | "auto";
export type ColorScheme = "dark" | "light";

export interface ThemeConfig {
  defaultTheme: keyof Themes;
  themes: Themes;
  defaultColorScheme: ColorScheme;
  defaultThemeMode: ThemeMode;
  cssVariablePrefix: string;
  generatedCSS: string;
  mappedVariables?: MappedVariables;
}

export interface ThemeState {
  currentTheme: keyof Themes;
  currentColorScheme: ColorScheme;
  currentMode: ThemeMode;
}

// export interface ClassScheme {
//   typography: {
//     h1: React.CSSProperties;
//     h2: React.CSSProperties;
//     h3: React.CSSProperties;
//     h4: React.CSSProperties;
//   };
//   layouts: {
//     base: React.CSSProperties;
//     headerFooter: React.CSSProperties;
//     main: React.CSSProperties;
//     sidebarLayout: React.CSSProperties;
//     sidebar: React.CSSProperties;
//     splitLayout: React.CSSProperties;
//     splitLeft: React.CSSProperties;
//     splitRight: React.CSSProperties;
//     gridLayout: React.CSSProperties;
//     gridItem: React.CSSProperties;
//     centerLayout: React.CSSProperties;
//     centerContent: React.CSSProperties;
//     sidebarOverlay: React.CSSProperties;
//     sidebarOverlayOpen: React.CSSProperties;
//   };
//   forms: {
//     errorMessage: React.CSSProperties;
//   };
//   buttons: {
//     primaryButton: React.CSSProperties;
//   };
// }

// export type GeneratedClasses<T> = {
//   [K in keyof T]: {
//     [p in keyof T[K]]: string;
//   };
// };

export interface MappedVariables extends Omit<Theme, "colors"> {
  colors: Record<keyof Colors, string>;
}
