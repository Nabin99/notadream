import React, { createContext, useContext, useState } from "react";

import { getAppConfig } from "../../config";
import { useDidMountEffect } from "../../utils/custom-hooks";
import {
  getDefaultThemeKey,
  getDefaultThemeMode,
  getThemes,
  updateTheme,
} from "../theme-config";

import type { Themes, ThemeState } from "../type";

const ThemeStateContext = createContext<ThemeState | undefined>(undefined);

const ThemeDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<ThemeState>> | undefined
>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedTheme = JSON.parse(
    localStorage.getItem(getAppConfig().theme.localStorageName) || "{}"
  );

  const themeStore = {
    currentThemeKey: storedTheme?.themeKey || getDefaultThemeKey(),
    currentTheme:
      getThemes()[
        (storedTheme?.themeKey as keyof Themes) || getDefaultThemeKey()
      ],
    currentMode: storedTheme?.mode || getDefaultThemeMode(),
  };

  const [themeState, setThemeState] = useState<ThemeState>(themeStore);

  useDidMountEffect(() => {
    updateTheme(themeState.currentTheme, themeState.currentMode, true);
  }, [themeState.currentMode]);

  return (
    <ThemeStateContext.Provider value={{ ...themeState }}>
      <ThemeDispatchContext.Provider value={setThemeState}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

export const useThemeState = (): ThemeState | undefined =>
  useContext(ThemeStateContext);

export const useSetThemeState = (): React.Dispatch<
  React.SetStateAction<ThemeState>
> => {
  const dispatch = useContext(ThemeDispatchContext);

  if (!dispatch) {
    throw new Error("useThemeDispatch must be used within a ThemeStore");
  }

  return dispatch;
};
