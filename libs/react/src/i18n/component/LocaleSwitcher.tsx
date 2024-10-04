import { Listbox } from "../../ui";
import { useTranslation } from "../context";

import type { ListboxOptionType } from "../../ui";

export const LocaleSwitcher = () => {
  const { setLanguage, language, supportedLanguages } = useTranslation();

  const handleChange = (selected: ListboxOptionType) => {
    setLanguage(selected?.value as string);
  };

  const languageOptions = supportedLanguages.map((language, index) => ({
    id: index + 1,
    name: language,
    value: language,
  }));

  return (
    <Listbox
      renderKey="name"
      data={languageOptions}
      selected={
        languageOptions.find(
          (option) => option.value === language
        ) as ListboxOptionType
      }
      setSelected={handleChange}
    />
  );
};
