import { useTranslation } from "@notadream/react";

import { HomepageSection } from "./HomepageSection";

import { RotatingCircle } from ".";

export const HowSection = () => {
  const { t } = useTranslation("homePage.howSection");

  return (
    <HomepageSection
      className="how-section"
      description={t("description")}
      headings={t("title").split("$$$")}
    >
      <RotatingCircle word="Planning" />
      <RotatingCircle word="Research" />
      <RotatingCircle word="Design" />
      <RotatingCircle word="Iteration" />
      <RotatingCircle word="Result" />
    </HomepageSection>
  );
};
