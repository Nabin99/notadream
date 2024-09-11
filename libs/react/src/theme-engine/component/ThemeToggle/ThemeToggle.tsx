import { useThemeState, useSetThemeState } from "../../context";

export const ThemeToggle = () => {
  const setCurrentThemeState = useSetThemeState();

  const theme = useThemeState();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const mode = event.target.value as "light" | "dark" | "auto";

    setCurrentThemeState((pre) => ({
      ...pre,
      currentMode: mode,
      currentColorScheme:
        mode != "auto" ? mode : darkThemeMq.matches ? "dark" : "light",
    }));
  };

  return (
    <div className="theme-toggle" data-theme={theme.currentColorScheme}>
      <label htmlFor="theme-select">Theme:</label>
      <select
        id="theme-select"
        value={theme.currentMode}
        onChange={handleChange}
      >
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};
