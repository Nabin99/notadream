import {
  Footer as FooterLayout,
  Logo,
  RouterLink,
  useTranslation,
} from "@notadream/react";
import Image from "next/image";

import logo from "../../assets/images/logo.svg";
import { SocialLinks } from "../../components/SocialLinks";

const FooterHeader = () => {
  const { t } = useTranslation("app");

  return (
    <>
      <Image src={logo} width="40" height="40" alt="Logo" />
      <span className="app-name">{t("name")}</span>
    </>
  );
};

const FooterBody = () => {
  const { t } = useTranslation("app.footer");
  return (
    <>
      <p>
        <span>{t("message").split("$$$")[0]}</span>
        <RouterLink variant="borderless" to="/contact">
          {t("message").split("$$$")[1]}
        </RouterLink>
      </p>
      <SocialLinks />
    </>
  );
};

const FooterFooter = () => {
  const { t } = useTranslation("app.footer");
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
