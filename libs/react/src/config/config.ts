import { AppConfig } from "./type";

interface ConfigurationProviderReturnType {
  configureApp: (config: AppConfig) => void;
  getConfig: () => Readonly<AppConfig>;
}

const configurationProvider = (): ConfigurationProviderReturnType => {
  const store = { config: {} } as { config: AppConfig };

  return {
    configureApp: (config: AppConfig) => {
      store.config = { ...config };
    },
    getConfig: () => ({ ...store.config }),
  };
};

export const { configureApp, getConfig } = configurationProvider();
