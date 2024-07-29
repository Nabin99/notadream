import { useThemeState, useSetThemeState } from "../../context";

export const ThemeToggle = () => {
  const theme = useThemeState();
  const setCurrentThemeState = useSetThemeState();

  return (
    <div>
      <button
        onClick={() => {
          if (theme.currentMode === "light") {
            setCurrentThemeState?.((pre) => ({
              ...pre,
              currentColorScheme: "dark",
              currentMode: "dark",
            }));
          } else if (theme.currentMode === "dark") {
            const darkThemeMq = window.matchMedia(
              "(prefers-color-scheme: dark)"
            );

            setCurrentThemeState?.((pre) => ({
              ...pre,
              currentColorScheme: darkThemeMq.matches ? "dark" : "light",
              currentMode: "auto",
            }));
          } else {
            setCurrentThemeState?.((pre) => ({
              ...pre,
              currentColorScheme: "light",
              currentMode: "light",
            }));
          }
        }}
      >
        Click to toggle
      </button>
    </div>
  );
};
