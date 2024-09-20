import { AppConfig } from "./type";

interface ConfigurationProviderReturnType {
  configureApp: (config: AppConfig) => void;
  getAppConfig: () => Readonly<AppConfig>;
}

const configurationProvider = (): ConfigurationProviderReturnType => {
  const store = { config: {} } as { config: AppConfig };

  return {
    configureApp: (config: AppConfig) => {
      store.config = { ...config };
    },
    getAppConfig: () => ({ ...store.config }),
  };
};

export const { configureApp, getAppConfig } = configurationProvider();
