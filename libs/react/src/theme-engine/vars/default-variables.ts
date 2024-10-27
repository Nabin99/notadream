import { Theme } from "../type";

export const defaultThemingVariables: Theme = {
  colors: {
    primary: {
      dark: "#212529",
      light: "#f8f9fa",
    },
    secondary: {
      dark: "#adb5bd",
      light: "#212529",
    },
    accent: {
      dark: "#16c7d5",
      light: "#16c7d5",
    },
    success: {
      dark: "#1e7e34",
      light: "#d4edda",
    },
    danger: {
      dark: "#721c24",
      light: "#f8d7da",
    },
    warning: {
      dark: "#856404",
      light: "#fff3cd",
    },
    info: {
      dark: "#0c5460",
      light: "#d1ecf1",
    },
    gradientBackground: {
      dark: "#212529",
      light: "#f8f9fa",
    },
    boxShadowSm: {
      dark: "0px 2px 4px rgba(256, 256, 256, 0.01)",
      light: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    boxShadowMd: {
      dark: "0px 4px 8px rgba(256, 256, 256, 0.01)",
      light: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    boxShadowLg: {
      dark: "0px 6px 12px rgba(256, 256, 256, 0.01)",
      light: "0px 6px 12px rgba(0, 0, 0, 0.1)",
    },
    transBackground: {
      dark: "#ffffff1a",
      light: "#00000021",
    },
    textLight: {
      dark: "#ced4da",
      light: "#495057",
    },
    textMuted: {
      dark: "#6c757d",
      light: "#6c757d",
    },
    border: {
      dark: "#343a40",
      light: "#dee2e6",
    },
    placeholder: {
      dark: "#6c757d",
      light: "#6c757d",
    },
    disabled: {
      dark: "#6c757d",
      light: "#6c757d",
    },
    white: {
      light: "#ffffff",
      dark: "#ffffff",
    },
    black: {
      light: "#000000",
      dark: "#000000",
    },
  },
  fontFamily: {
    text: "Mitr, sans-serif, Arial, sans-serif",
    heading: "Mitr, sans-serif, Arial, sans-serif",
  },
  fontSizes: {
    base: "16px",
    h1: "2.5rem",
    h2: "2rem",
    h3: "1.75rem",
    h4: "1.5rem",
    h5: "1.25rem",
    h6: "1rem",
    small: "0.875rem",
    caption: "0.75rem",
  },
  fontWeight: {
    base: "normal",
    h1: "bold",
    h2: "bold",
    h3: "bold",
    h4: "bold",
    h5: "bold",
    h6: "bold",
    small: "normal",
    caption: "normal",
  },
  lineHeight: {
    base: "1.5",
    h1: "1.2",
    h2: "1.3",
    h3: "1.4",
    h4: "1.5",
    h5: "1.6",
    h6: "1.7",
    small: "1.3",
    caption: "1.2",
  },
  spacing: {
    xs: "0.2rem",
    sm: "0.5rem",
    md: "0.8rem",
    lg: "1.2rem",
    xl: "1.5rem",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    pill: "9999px",
  },
  borderWidth: {
    sm: "1px",
    md: "2px",
    lg: "4px",
  },
  zIndex: {
    dropdown: "1000",
    sticky: "1020",
    fixed: "1030",
    modalBackdrop: "1040",
    modal: "1050",
    popover: "1060",
    tooltip: "1070",
  },
  breakpoints: {
    xs: "0",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  miscellaneous: {
    maxPageWidth: "1200px",
  },
};
