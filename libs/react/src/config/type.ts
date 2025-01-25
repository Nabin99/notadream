export interface AppConfig {
  apiBaseURL: string;
  appName: string;
  appDescription: string;
  appKeywords: string;
  appLogo: string;
  appPort: number;
  appTitle: string;
  copyright: {
    holder: string;
    url?: string;
  };
  i18n: {
    supportedLanguages: string[];
    defaultLanguage: string;
    localStorageName: string;
  };
  theme: ThemeOptions;
  websiteDomain: string;
  version: string;
}

export interface ThemeOptions {
  localStorageName: string;
}
