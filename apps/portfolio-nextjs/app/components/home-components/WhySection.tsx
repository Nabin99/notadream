import { useTranslation } from "@notadream/react";
import { FaSquareCheck } from "react-icons/fa6";

import { Card } from "./Card";
import { HomepageSection } from "./HomepageSection";

const whyList = {
  en: [
    {
      title: "Comprehensive Full Stack Expertise",
      description:
        "I bring end-to-end skills in web and mobile app development. From React and JavaScript on the frontend to Node.js and Python on the backend, I build solutions that are efficient, scalable, and user-friendly, delivering a seamless experience from the first line of code to launch.",
    },
    {
      title: "Mobile-First Design",
      description:
        "With mobile usage growing rapidly, I prioritize mobile-first development. My designs adapt to all screen sizes and devices, ensuring a great user experience, whether on desktop or mobile, and contributing to better SEO performance.",
    },
    {
      title: "SEO-Focused Development",
      description:
        "Combining full stack development with SEO expertise, I create solutions designed to rank and reach your target audience. My approach integrates keyword research, on-page optimization, and mobile-friendly design, ensuring visibility in search engines from day one.",
    },
    {
      title: "User-Centric Problem Solving",
      description:
        "I focus on building with the user in mind, ensuring every element is intuitive and serves a purpose. I’m also adaptable and quick to implement feedback, making sure the final product aligns with your vision and the evolving needs of users.",
    },
    {
      title: "Commitment to Quality and Innovation",
      description:
        "My work is rooted in high-quality standards and attention to detail, with an eye toward innovative solutions. I strive to deliver code that’s clean, well-documented, and ready to scale, offering a strong foundation for any future updates.",
    },
    {
      title: "Communication and Reliability",
      description:
        "I view every project as a collaborative effort. With clear, consistent communication, I ensure you’re updated and involved in every step. My dedication to timelines and transparency means you can rely on me to deliver with precision and efficiency.",
    },
  ],
  fr: [
    {
      title: "Expertise Full Stack Complète",
      description:
        "J'apporte des compétences de bout en bout en développement d'applications web et mobiles. De React et JavaScript côté frontend à Node.js et Python côté backend, je construis des solutions efficaces, évolutives et conviviales, offrant une expérience fluide de la première ligne de code au lancement.",
    },
    {
      title: "Design Mobile-First",
      description:
        "Avec l'utilisation mobile qui croît rapidement, je priorise le développement mobile-first. Mes designs s'adaptent à toutes les tailles d'écran et appareils, garantissant une excellente expérience utilisateur, que ce soit sur ordinateur ou mobile, et contribuant à de meilleures performances SEO.",
    },
    {
      title: "Développement Axé SEO",
      description:
        "Combinant le développement full stack avec l'expertise SEO, je crée des solutions conçues pour être bien classées et atteindre votre audience cible. Mon approche intègre la recherche de mots-clés, l'optimisation on-page, et le design mobile-friendly, garantissant la visibilité dans les moteurs de recherche dès le premier jour.",
    },
    {
      title: "Résolution de Problèmes Centrée Utilisateur",
      description:
        "Je me concentre sur la construction en gardant l'utilisateur à l'esprit, m'assurant que chaque élément est intuitif et sert un objectif. Je suis également adaptable et rapide à implémenter les retours, m'assurant que le produit final s'aligne avec votre vision et les besoins évolutifs des utilisateurs.",
    },
    {
      title: "Engagement envers la Qualité et l'Innovation",
      description:
        "Mon travail est ancré dans des standards de haute qualité et l'attention aux détails, avec un œil vers des solutions innovantes. Je m'efforce de livrer du code propre, bien documenté, et prêt à évoluer, offrant une base solide pour toutes futures mises à jour.",
    },
    {
      title: "Communication et Fiabilité",
      description:
        "Je considère chaque projet comme un effort collaboratif. Avec une communication claire et cohérente, je m'assure que vous êtes informé et impliqué à chaque étape. Mon dévouement aux délais et à la transparence signifie que vous pouvez compter sur moi pour livrer avec précision et efficacité.",
    },
  ],
};

export const WhySection = () => {
  const { t, language } = useTranslation("homePage.whySection");

  const headings = t("title").split("$$$");

  return (
    <HomepageSection
      className="why-section"
      headings={headings}
      description={t("description")}
    >
      <>
        {whyList[language as keyof typeof whyList]?.map((why) => (
          <Card
            key={why.title}
            icon={<FaSquareCheck />}
            title={why.title}
            description={why.description}
          />
        ))}
      </>
      <div className="background-art left"></div>
      <div className="background-art right"></div>
    </HomepageSection>
  );
};
