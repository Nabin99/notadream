import { Listbox } from "../../../ui";
import { useThemeState, useSetThemeState } from "../../context";

import type { ListboxOptionType } from "../../../ui";

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

  const themesOptions = [
    {
      id: 1,
      name: "Auto",
      value: "auto",
    },
    {
      id: 2,
      name: "Light",
      value: "light",
    },
    {
      id: 3,
      name: "Dark",
      value: "dark",
    },
  ];

  return (
    <Listbox
      accessKey="name"
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
