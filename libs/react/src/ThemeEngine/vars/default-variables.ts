import { Theme } from "../type";

export const defaultThemingVariables: Theme = {
  colors: {
    primary: {
      dark: "#0056b3",
      light: "#b8daff",
    },
    secondary: {
      dark: "#4b4f54",
      light: "#e2e3e5",
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
    background: {
      dark: "#212529",
      light: "#f8f9fa",
    },
    text: {
      dark: "#adb5bd",
      light: "#212529",
    },
    textLight: {
      dark: "#ced4da",
      light: "#495057",
    },
    textMuted: {
      dark: "#6c757d",
      light: "#6c757d",
    },
    link: {
      dark: "#007bff",
      light: "#007bff",
    },
    linkHover: {
      dark: "#0056b3",
      light: "#0056b3",
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
  fontFamily: { text: "Arial, sans-serif", heading: "Arial, sans-serif" },
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
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    pill: "9999px",
  },
  boxShadow: {
    sm: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    md: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    lg: "0px 6px 12px rgba(0, 0, 0, 0.1)",
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
};
