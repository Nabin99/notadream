"use client";

import { Button, useTranslation } from "@notadream/react";
import { useRouter } from "next/navigation";

import { RippleEffect } from "../../components";
import { ContentBox } from "../../components/ContentBox";
import { SocialLinks } from "../../components/SocialLinks";

export const HeroSection = () => {
  const { t } = useTranslation("homePage.heroSection");
  const router = useRouter();

  return (
    <section className="hero-section">
      <ContentBox>
        <div className="heading">
          <span>{t("greetings")}</span>
          <p>{t("introduction")}</p>
          <h1>{t("title")}</h1>
          <p>{t("subtitle")}</p>
          <div className="hero-buttons">
            <Button
              label={t("buttons.explore")}
              variant="solid"
              size="medium"
              onClick={() => {
                router.push("/portfolio");
              }}
            />
            <Button
              label={t("buttons.connect")}
              variant="outline"
              size="medium"
              onClick={() => {
                router.push("/contact");
              }}
            />
            <SocialLinks />
          </div>
        </div>
        <RippleEffect />
        {/* <div className="background-art left"></div> */}
        {/* <div className="background-art right"></div> */}
      </ContentBox>
    </section>
  );
};
