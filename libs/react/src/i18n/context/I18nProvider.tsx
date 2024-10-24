import React, { createContext, useContext, useState, ReactNode } from "react";

import { getAppConfig } from "../../config";
import { useDidMountEffect } from "../../utils/custom-hooks";

import type {
  I18nContextProperties,
  TranslationData,
  Translations,
} from "../types";

const I18nContext = createContext<I18nContextProperties | undefined>(undefined);

// I18nProvider component
export const I18nProvider: React.FC<{
  children: ReactNode;
  translations: Translations;
}> = ({ children, translations }) => {
  const localStorageName = getAppConfig().i18n.localStorageName;
  const defaultLanguage: string =
    JSON.parse(localStorage.getItem(localStorageName) || "{}")?.language ||
    getAppConfig().i18n.defaultLanguage;

  const [language, setLanguage] = useState(defaultLanguage);

  // Function to replace placeholders in translation strings
  const replacePlaceholders = (
    text: string,
    parameters?: { [key: string]: string }
  ): string => {
    if (!parameters) {
      return text;
    }

    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => parameters[key] || "");
  };

  // Translation function
  const t = (key: string, parameters?: { [key: string]: string }): string => {
    const keys = key.split(".");
    let translation = translations[language as keyof Translations];

    for (const k of keys) {
      if (
        typeof translation === "object" &&
        typeof translation[k as keyof TranslationData]
      ) {
        translation = translation[k as keyof TranslationData] as string;
      } else {
        return key; // return the key itself if not found
      }
    }

    return replacePlaceholders(translation as string, parameters);
  };

  useDidMountEffect(() => {
    localStorage.setItem(
      localStorageName,
      JSON.stringify({
        language,
      })
    );
  }, [language]);

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: getAppConfig()?.i18n?.supportedLanguages || [],
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

// Custom hook to access i18n context
export const useTranslation = (nameSpaceKey?: string) => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }

  return {
    ...context,
    t: (
      key: string,
      options?: { parameters?: { [key: string]: string }; use?: string }
    ) => {
      return context.t(
        nameSpaceKey || options?.use
          ? `${options?.use ? options?.use : nameSpaceKey}.${key}`
          : key,
        options?.parameters
      );
    },
  };
};
