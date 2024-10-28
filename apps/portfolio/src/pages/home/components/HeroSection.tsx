import { Button, useTranslation } from "@notadream/react";

import { ContentBox } from "../../../components/ContentBox";
import { SocialLinks } from "../../../components/SocialLinks";

export const HeroSection = () => {
  const { t } = useTranslation("homePage.heroSection");

  return (
    <section className="hero-section">
      <ContentBox>
        <div>
          <span>{t("greetings")}</span>
          <p>{t("introduction")}</p>
          <h1>{t("title")}</h1>
          <p>{t("subtitle")}</p>
          <div className="hero-buttons">
            <Button label={t("buttons.explore")} variant="outline" />
            <Button label={t("buttons.connect")} variant="outline" />
          </div>
          <SocialLinks />
        </div>
      </ContentBox>
    </section>
  );
};
