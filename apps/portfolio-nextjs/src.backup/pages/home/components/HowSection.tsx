import { useTranslation } from "@notadream/react";

import { HomepageSection } from "./HomepageSection";

import { RotatingCircle } from ".";

const workflow = {
  en: ["Planning", "Research", "Design", "Iteration", "Result"],
  fr: ["Planification", "Recherche", "Design", "Itération", "Résultat"],
};

export const HowSection = () => {
  const { t, language } = useTranslation("homePage.howSection");

  return (
    <HomepageSection
      className="how-section"
      description={t("description")}
      headings={t("title").split("$$$")}
    >
      {workflow[language as keyof typeof workflow]?.map((word, i) => (
        <RotatingCircle key={word + i} word={word} />
      ))}
    </HomepageSection>
  );
};
