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
        message: string;
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
    contactPage: {
      title: string;
      subtitle: string;
      description: string;
      directContact: string;
      form: {
        title: string;
        caption: string;
        fields: {
          firstName: string;
          lastName: string;
          email: string;
          subject: string;
          message: string;
        };
        fieldsError: {
          firstName: { required: string };
          lastName: { required: string };
          email: { required: string; invalidFormat: string };
          message: { required: string; insufficient: string };
        };
        button: {
          submit: string;
        };
        toastMessage: {
          success: string;
          failed: string;
        };
      };
    };
    aboutPage: {
      title: string;
      description1: string;
      description2: string;
      philosophy: string;
      whoIAm: {
        title: string;
        description: string;
      };
      achievements: {
        title: string;
        list: {
          bestPerformer: string;
          npmRegistry: string;
          proficientIn: string;
        };
      };
      projects: {
        title: string;
        description: string;
      };
      experience: {
        title: string;
        description: string;
      };
      drive: {
        title: string;
        description: string;
      };
      personal: {
        title: string;
        description: string;
      };
      connect: {
        title: string;
        description: string;
        link: string;
      };
    };
    portfolioPage: {
      title: string;
      description: string;
      experience: {
        title: string;
      };
      education: {
        title: string;
      };
      skillsTechnical: {
        title: string;
      };
      skillsSoft: {
        title: string;
      };
      projects: {
        title: string;
      };
      contact: {
        title: string;
        description: string;
        link: string;
      };
    };
  }

  interface Translations {
    ne: TranslationData;
  }
}
