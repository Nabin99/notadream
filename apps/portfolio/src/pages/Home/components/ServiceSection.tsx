import { useTranslation } from "@notadream/react";

import Card from "./Card";
import { ContentBox } from "../../../components/ContentBox";

export default function ServiceSection() {
  const { t } = useTranslation("homePage.serviceSection");

  const headings = t("title").split("$$$");

  return (
    <section className="service-section">
      <ContentBox>
        <h2>
          {headings[0]} <span>{headings[1]}</span>
        </h2>

        <p>{t("description")}</p>

        <div className="service-content">
          <Card />
        </div>
      </ContentBox>
    </section>
  );
}
