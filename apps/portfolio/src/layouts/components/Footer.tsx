import { Footer as FooterLayout, Logo, useTranslation } from "@notadream/react";

const FooterHeader = () => {
  const { t } = useTranslation("app");

  return (
    <>
      <Logo src="/vite.svg" size="large" alt="Logo" />
      <span className="app-name">{t("name")}</span>
    </>
  );
};

const FooterBody = () => {
  const { t } = useTranslation("footer");
  return (
    <>
      <span>{t("thankYouMessage")}</span>
    </>
  );
};

const FooterFooter = () => {
  const { t } = useTranslation("footer");
  return (
    <>
      <span>
        {t("buildMessage")} <span className="heart-symbol">❤</span>
      </span>
      <span>{`© ${t("copyRight", {
        parameters: {
          year: new Date().getFullYear().toString(),
          name: t("name", { use: "app" }),
        },
      })}`}</span>
    </>
  );
};

export const Footer = () => {
  return (
    <FooterLayout
      header={<FooterHeader />}
      body={<FooterBody />}
      footer={<FooterFooter />}
    />
  );
};
