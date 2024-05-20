import { useThemeState } from "../../context";

export const ThemeToggle = () => {
  const theme = useThemeState();
  // const setCurrentThemeState = useSetThemeState();

  return (
    <div>
      <button
        onClick={() => {
          if (theme.currentMode === "dark") {
            theme.setCurrentThemeState?.((pre) => ({
              ...pre,
              currentColorScheme: "dark",
              currentMode: "dark",
            }));
          } else if (theme.currentMode === "light") {
            theme.setCurrentThemeState?.((pre) => ({
              ...pre,
              currentColorScheme: "light",
              currentMode: "light",
            }));
          } else {
            const darkThemeMq = window.matchMedia(
              "(prefers-color-scheme: dark)"
            );

            theme.setCurrentThemeState?.((pre) => ({
              ...pre,
              currentColorScheme: darkThemeMq.matches ? "dark" : "light",
              currentMode: "auto",
            }));
          }
        }}
      >
        Click to toggle
      </button>
    </div>
  );
};
