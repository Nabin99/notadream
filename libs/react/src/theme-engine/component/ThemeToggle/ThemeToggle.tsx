import { HiSun } from "react-icons/hi";
import { HiMiniMoon } from "react-icons/hi2";
import { WiMoonAltThirdQuarter } from "react-icons/wi";

import { Listbox } from "../../../ui";
import { useThemeState, useSetThemeState } from "../../context";

import type { ListboxOptionType } from "../../../ui";

const themesOptions = [
  {
    id: 1,
    name: <WiMoonAltThirdQuarter />,
    value: "auto",
  },
  {
    id: 2,
    name: <HiSun />,
    value: "light",
  },
  {
    id: 3,
    name: <HiMiniMoon />,
    value: "dark",
  },
];

export const ThemeToggle = () => {
  const setCurrentThemeState = useSetThemeState();

  const theme = useThemeState();

  const handleChange = (value: ListboxOptionType) => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const mode = value.value as "light" | "dark" | "auto";

    setCurrentThemeState((pre) => ({
      ...pre,
      currentMode: mode,
      currentColorScheme:
        mode != "auto" ? mode : darkThemeMq.matches ? "dark" : "light",
    }));
  };

  return (
    <Listbox
      renderKey="name"
      data={themesOptions}
      selected={
        themesOptions.find(
          (option) => option.value === theme.currentMode
        ) as ListboxOptionType
      }
      setSelected={handleChange}
    />
  );
};
