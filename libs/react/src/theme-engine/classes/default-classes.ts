import { ClassScheme, MappedVariables } from "../type";

const useVariables = (variable: string) => `var(--${variable})`;

export const getClassesDefinition = (
  mappedVariables: MappedVariables
): ClassScheme => ({
  forms: {
    errorMessage: {
      fontSize: useVariables(mappedVariables.fontSizes.small),
      color: useVariables(mappedVariables.colors.danger),
    },
  },
  typography: {
    h1: {
      fontSize: useVariables(mappedVariables.fontSizes.h1),
      fontWeight: useVariables(mappedVariables.fontWeight.h1),
      lineHeight: useVariables(mappedVariables.lineHeight.h1),
    },
    h2: {
      fontSize: useVariables(mappedVariables.fontSizes.h2),
      fontWeight: useVariables(mappedVariables.fontWeight.h2),
      lineHeight: useVariables(mappedVariables.lineHeight.h2),
    },
    h3: {
      fontSize: useVariables(mappedVariables.fontSizes.h3),
      fontWeight: useVariables(mappedVariables.fontWeight.h3),
      lineHeight: useVariables(mappedVariables.lineHeight.h3),
    },
    h4: {
      fontSize: useVariables(mappedVariables.fontSizes.h4),
      fontWeight: useVariables(mappedVariables.fontWeight.h4),
      lineHeight: useVariables(mappedVariables.lineHeight.h4),
    },
  },
  buttons: {
    primaryButton: {
      color: useVariables(mappedVariables.colors.white),
      backgroundColor: useVariables(mappedVariables.colors.primary),
    },
  },
  layouts: {
    base: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    headerFooter: {
      padding: useVariables(mappedVariables.spacing.lg),
      backgroundColor: useVariables(mappedVariables.colors.background),
    },
    main: {
      flexGrow: 1,
      padding: useVariables(mappedVariables.spacing.lg),
    },
    sidebarLayout: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      gridTemplateColumns: "200px 1fr",
      gridTemplateAreas: `
      "header header"
      "sidebar main"
      "footer footer"
    `,
    },
    sidebar: {
      gridArea: "sidebar",
      padding: useVariables(mappedVariables.spacing.lg),
      backgroundColor: "#e9ecef",
    },
    splitLayout: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateAreas: `
      "header header"
      "left right"
      "footer footer"
    `,
    },
    splitLeft: {
      gridArea: "left",
      padding: useVariables(mappedVariables.spacing.lg),
      backgroundColor: "#e9ecef",
    },
    splitRight: {
      gridArea: "right",
      padding: useVariables(mappedVariables.spacing.lg),
      backgroundColor: "#ffffff",
    },
    gridLayout: {
      display: "grid",
      gap: useVariables(mappedVariables.spacing.lg),
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      padding: useVariables(mappedVariables.spacing.lg),
    },
    gridItem: {
      backgroundColor: "#ffffff",
      padding: useVariables(mappedVariables.spacing.lg),
      border: "1px solid #dee2e6",
      borderRadius: "4px",
    },
    centerLayout: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    centerContent: {
      textAlign: "center",
      padding: useVariables(mappedVariables.spacing.lg),
      backgroundColor: "#ffffff",
      border: "1px solid #dee2e6",
      borderRadius: "4px",
    },
    sidebarOverlay: {
      width: "250px",
      padding: useVariables(mappedVariables.spacing.lg),
      backgroundColor: "#e9ecef",
      position: "absolute",
      height: "100%",
      zIndex: 1,
      transition: "transform 0.3s ease-in-out",
      transform: "translateX(-100%)",
    },
    sidebarOverlayOpen: {
      transform: "translateX(0)",
    },
  },
});
