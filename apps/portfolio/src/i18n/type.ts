import "@notadream/react";

declare module "@notadream/react" {
  interface TranslationData {
    app: {
      description: string;
      name: string;
      title: string;
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
    };
    homePage: {
      heroSection: {
        buttons: {
          connect: string;
          explore: string;
        };
        greetings: string;
        introduction: string;
        title: string;
        subtitle: string;
      };
      whySection: {
        title: string;
        description: string;
      };
      serviceSection: {
        title: string;
        description: string;
      };
      howSection: {
        title: string;
        description: string;
      };
    };
  }

  interface Translations {
    ne: TranslationData;
  }
}
