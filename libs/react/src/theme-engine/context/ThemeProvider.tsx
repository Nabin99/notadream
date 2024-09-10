import React, { createContext, useContext, useState } from "react";

import { useDidMountEffect } from "../../utils/custom-hooks";
import {
  getDefaultTheme,
  getDefaultThemeMode,
  getThemes,
  updateTheme,
} from "../theme-config";

import type { ThemeState } from "../type";

const ThemeStateContext = createContext<ThemeState>({
  currentThemeName: "notadream",
  currentTheme: getThemes()["notadream"],
  currentColorScheme: "light",
  currentMode: "auto",
});

const ThemeDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<ThemeState>> | undefined
>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeStore: ThemeState = {
    currentColorScheme: window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light",
    currentThemeName: getDefaultTheme(),
    currentTheme: getThemes()["notadream"],
    currentMode: getDefaultThemeMode(),
  };

  const [themeState, setThemeState] = useState<ThemeState>(themeStore);

  useDidMountEffect(() => {
    updateTheme(themeState.currentTheme, themeState.currentColorScheme, true);
  }, [themeState.currentColorScheme]);

  useDidMountEffect(() => {
    updateTheme(themeState.currentTheme, themeState.currentColorScheme, true);
  }, [themeState.currentTheme]);

  return (
    <ThemeStateContext.Provider value={{ ...themeState }}>
      <ThemeDispatchContext.Provider value={setThemeState}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

export const useThemeState = (): ThemeState => useContext(ThemeStateContext);

export const useSetThemeState = (): React.Dispatch<
  React.SetStateAction<ThemeState>
> => {
  const dispatch = useContext(ThemeDispatchContext);

  if (!dispatch) {
    throw new Error("useThemeDispatch must be used within a ThemeStore");
  }

  return dispatch;
};
