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
  websiteDomain: string;
  version: string;
}
