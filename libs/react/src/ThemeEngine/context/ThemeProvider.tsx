// ThemeContext.tsx
import React, { createContext, useContext, useState } from "react";

import { getDefaultTheme, getDefaultThemeMode } from "../theme-config";

// import type { ColorScheme, ThemeMode, ThemeState, Themes } from "../type";
import type { ThemeState } from "../type";

// export enum ThemeActions {
//   SET_THEME = "SET_THEME",
//   SET_COLOR_SCHEME = "SET_COLOR_SCHEME",
//   SET_THEME_MODE = "SET_THEME_MODE",
// }

// export interface ThemeAction {
//   type: ThemeActions.SET_THEME;
//   payload: keyof Themes;
// }

// export interface ColorSchemeAction {
//   type: ThemeActions.SET_COLOR_SCHEME;
//   payload: ColorScheme;
// }

// export interface ThemeModeAction {
//   type: ThemeActions.SET_THEME_MODE;
//   payload: ThemeMode;
// }

const ThemeStateContext = createContext<ThemeState>({
  currentTheme: "notadream",
  currentColorScheme: "light",
  currentMode: "auto",
  // setCurrentThemeState: undefined,
});

const ThemeDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<ThemeState>> | undefined
>(undefined);

// const themeReducer = (
//   state: ThemeState,
//   action: ThemeAction | ColorSchemeAction
// ): ThemeState => {
//   switch (action.type) {
//     case ThemeActions.SET_THEME:
//       return { ...state, currentTheme: action.payload };
//     case ThemeActions.SET_COLOR_SCHEME:
//       return { ...state, currentColorScheme: action.payload };
//     default:
//       return state;
//   }
// };

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeStore: ThemeState = {
    currentColorScheme: window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light",
    currentTheme: getDefaultTheme(),
    currentMode: getDefaultThemeMode(),
    // setCurrentThemeState: undefined,
  };
  // const [themeState, dispatch] = useReducer(themeReducer, themeStore);

  const [themeState, setThemeState] = useState<ThemeState>(themeStore);

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

// export const useSetColorScheme = (): ((colorScheme: ColorScheme) => void) => {
//   const dispatch = useContext(ThemeDispatchContext);

//   if (!dispatch) {
//     throw new Error("useThemeDispatch must be used within a ThemeStore");
//   }

//   return (colorScheme: ColorScheme) => {
//     dispatch({ type: ThemeActions.SET_COLOR_SCHEME, payload: colorScheme });
//   };
// };

// export const useSetThemeMode = (): ((colorScheme: ColorScheme) => void) => {
//   const dispatch = useContext(ThemeDispatchContext);

//   if (!dispatch) {
//     throw new Error("useThemeDispatch must be used within a ThemeStore");
//   }

//   return (colorScheme: ColorScheme) => {
//     dispatch({ type: ThemeActions.SET_COLOR_SCHEME, payload: colorScheme });
//   };
// };
