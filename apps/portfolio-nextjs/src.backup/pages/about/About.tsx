import { Page, RouterLink, useTranslation } from "@notadream/react";

import aboutImage from "../../assets/images/aboutme-intro.webp";
import { ContentBox } from "../../components";

import "../../assets/css/pages/about/index.css";

export const About = () => {
  const { t } = useTranslation("aboutPage");

  return (
    <Page className="about">
      <section className="about-intro">
        <ContentBox>
          <img
            className="about-intro-image"
            src={aboutImage}
            alt="Nabin Dhital"
            loading="lazy"
          />
          <div className="about-intro-content">
            <h1>
              {t("title").split("$$$")[0]}
              <span>{t("title").split("$$$")[1]}</span>
            </h1>
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
          </div>
          <div className="background-art left"></div>
          <div className="background-art right"></div>
        </ContentBox>
      </section>

      <ContentBox>
        <section className="about-philosophy text-quote">
          {t("philosophy")}
        </section>
        <section className="about-who">
          <h2>
            {t("whoIAm.title").split("$$$")[0]}
            <br />
            <span>
              {t("whoIAm.title").split("$$$")[1]}
              <br />
            </span>
            ?
          </h2>
          <p>{t("whoIAm.description")}</p>
          <div className="background-art left"></div>
        </section>
        <div className="about-accomplishments">
          <section className="about-achievements">
            <h2>
              <span>{t("achievements.title").split("$$$")[0]}</span>
              {t("achievements.title").split("$$$")[1]}{" "}
              <span>{t("achievements.title").split("$$$")[2]}</span>
            </h2>
            <ul>
              <li>
                <p>{t("achievements.list.bestPerformer")}</p>
              </li>
              <li>
                <p>{t("achievements.list.npmRegistry")}</p>
              </li>
              <li>
                <p>{t("achievements.list.proficientIn")}</p>
              </li>
            </ul>
          </section>
          <div className="about-stats">
            <div className="stat-item">
              <h2>
                {t("projects.title").split("$$$")[0]}
                <span>{t("projects.title").split("$$$")[1]}</span>
              </h2>
              <p>{t("projects.description")}</p>
            </div>
            <div className="stat-item">
              <h2>
                {t("experience.title").split("$$$")[0]}
                <span>{t("experience.title").split("$$$")[1]}</span>
              </h2>
              <p>{t("experience.description")}</p>
            </div>
          </div>
        </div>
        <div className="about-drive-personal">
          <section className="about-drive">
            <h2>
              {t("drive.title").split("$$$")[0]}
              <span>{t("drive.title").split("$$$")[1]}</span>
            </h2>
            <p>{t("drive.description")}</p>
          </section>
          <section className="about-personal">
            <h2>
              {t("personal.title").split("$$$")[0]}
              <span>{t("personal.title").split("$$$")[1]}</span>
            </h2>
            <p>{t("personal.description")}</p>
          </section>
          <div className="background-art left"></div>
          <div className="background-art right"></div>
        </div>
        <section className="about-connect">
          <h2>
            {t("connect.title").split("$$$")[0]}
            <br />
            {t("connect.title").split("$$$")[1]}
            <span>{t("connect.title").split("$$$")[2]}</span>
          </h2>
          <p className="text-quote">
            {t("connect.description")}
            <RouterLink to="/contact" variant="borderless">
              {t("connect.link")}
            </RouterLink>
          </p>
        </section>
      </ContentBox>
    </Page>
  );
};

export default About;
