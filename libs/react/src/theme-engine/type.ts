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
}

export interface ThemeState {
  currentThemeName: keyof Themes;
  currentTheme: Theme;
  currentColorScheme: ColorScheme;
  currentMode: ThemeMode;
}
