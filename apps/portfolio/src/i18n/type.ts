import "@notadream/react";

declare module "@notadream/react" {
  interface TranslationData {
    app: {
      description: string;
      name: string;
      title: string;
    };
    header: {
      navigationList: {
        about: string;
        blogs: string;
        contact: string;
        home: string;
        portfolio: string;
      };
    };
    footer: {
      buildMessage: string;
      copyRight: string;
      thankYouMessage: string;
    };
  }

  interface Translations {
    ne: TranslationData;
  }
}
