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
  white: string;
  black: string;
}

export interface Typography {
  fontFamily: string;
  baseFontSize: string;
  headingFontFamily: string;
  headings: Record<string, TypographyVariant>;
  text: Record<string, TypographyVariant>;
}

export interface TypographyVariant {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

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
  typography: Typography;
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
}

export interface ThemeState {
  currentTheme: keyof Themes;
  currentColorScheme: ColorScheme;
  currentMode: ThemeMode;
  setCurrentThemeState:
    | React.Dispatch<React.SetStateAction<ThemeState>>
    | undefined;
}
