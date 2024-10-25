import "@notadream/react";

declare module "@notadream/react" {
  interface TranslationData {
    app: {
      name: string;
      title: string;
      description: string;
    };
    header: {
      navigationList: {
        home: string;
        about: string;
        services: string;
      };
    };
    footer: {
      copyRight: string;
      thankYouMessage: string;
      buildMessage: string;
    };
  }

  interface Translations {
    ne: TranslationData;
  }
}
