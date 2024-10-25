export interface TranslationData {}

export interface Translations {
  en: TranslationData;
}

export interface I18nContextProperties {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, parameters?: { [key: string]: string }) => string;
  supportedLanguages: string[];
}
