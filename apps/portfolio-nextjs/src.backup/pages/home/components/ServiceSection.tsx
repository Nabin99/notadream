import { useTranslation } from "@notadream/react";
import { CgWebsite } from "react-icons/cg";
import { GrHostMaintenance } from "react-icons/gr";
import { MdDesignServices } from "react-icons/md";
import { RiSeoFill } from "react-icons/ri";
import { TbStack2Filled } from "react-icons/tb";
import { TbDeviceMobileCode } from "react-icons/tb";

import { Card } from "./Card";
import { HomepageSection } from "./HomepageSection";

const serviceList = {
  en: [
    {
      icon: MdDesignServices,
      title: "UI/UX Design",
      description:
        "Great digital products start with great design. I focus on creating intuitive, visually appealing user interfaces that elevate user experience. By understanding user needs and combining them with a clean, modern aesthetic, I build designs that engage users and align with your brand’s goals.",
    },
    {
      icon: TbStack2Filled,
      title: "Full Stack Web Development",
      description:
        "From the frontend interface to backend logic, I build complete web solutions that are both functional and scalable. Leveraging technologies like JavaScript, React, Node.js, and Python, I create websites that perform seamlessly across devices, with a focus on user experience and reliability.",
    },
    {
      icon: TbDeviceMobileCode,
      title: "Mobile App Development",
      description:
        "With mobile-first in mind, I develop responsive, high-quality mobile applications for iOS and Android that offer users a smooth experience. I prioritize functionality and ease of use, creating apps that meet your business goals while enhancing user engagement.",
    },
    {
      icon: RiSeoFill,
      title: "SEO Optimization and Strategy",
      description:
        "Effective SEO ensures your platform is discoverable by the right audience. I implement SEO best practices—including keyword integration, fast load times, and mobile responsiveness—to improve your search rankings, drive traffic, and create a lasting online presence.",
    },
    {
      icon: CgWebsite,
      title: "E-commerce Development",
      description:
        "For businesses looking to sell online, I develop secure, user-friendly e-commerce solutions. From setting up a streamlined product catalog to implementing smooth payment systems, I create e-commerce platforms that provide a top-tier shopping experience, focused on conversion and customer satisfaction.",
    },
    {
      icon: GrHostMaintenance,
      title: "Website Maintenance & Support",
      description:
        "A website’s success depends on reliable maintenance. I offer ongoing support to keep your website running smoothly, including performance optimization, security updates, and content updates, so you can focus on your business while I handle the technical side.",
    },
  ],
  fr: [
    {
      icon: MdDesignServices,
      title: "Design UI/UX",
      description:
        "Les grands produits numériques commencent par un grand design. Je me concentre sur la création d'interfaces utilisateur intuitives et visuellement attrayantes qui élèvent l'expérience utilisateur. En comprenant les besoins des utilisateurs et en les combinant avec une esthétique propre et moderne, je construis des designs qui engagent les utilisateurs et s'alignent avec les objectifs de votre marque.",
    },
    {
      icon: TbStack2Filled,
      title: "Développement Web Full Stack",
      description:
        "De l'interface frontend à la logique backend, je construis des solutions web complètes qui sont à la fois fonctionnelles et évolutives. En exploitant des technologies comme JavaScript, React, Node.js, et Python, je crée des sites web qui fonctionnent parfaitement sur tous les appareils, avec un focus sur l'expérience utilisateur et la fiabilité.",
    },
    {
      icon: TbDeviceMobileCode,
      title: "Développement d'Applications Mobiles",
      description:
        "Avec une approche mobile-first à l'esprit, je développe des applications mobiles responsives et de haute qualité pour iOS et Android qui offrent aux utilisateurs une expérience fluide. Je priorise la fonctionnalité et la facilité d'utilisation, créant des applications qui répondent à vos objectifs commerciaux tout en améliorant l'engagement utilisateur.",
    },
    {
      icon: RiSeoFill,
      title: "Optimisation et Stratégie SEO",
      description:
        "Un SEO efficace garantit que votre plateforme soit découvrable par la bonne audience. J'implémente les meilleures pratiques SEO—incluant l'intégration de mots-clés, des temps de chargement rapides, et la responsivité mobile—pour améliorer votre classement dans les moteurs de recherche, générer du trafic, et créer une présence en ligne durable.",
    },
    {
      icon: CgWebsite,
      title: "Développement E-commerce",
      description:
        "Pour les entreprises cherchant à vendre en ligne, je développe des solutions e-commerce sécurisées et conviviales. De la mise en place d'un catalogue produit rationalisé à l'implémentation de systèmes de paiement fluides, je crée des plateformes e-commerce qui offrent une expérience d'achat de premier niveau, axée sur la conversion et la satisfaction client.",
    },
    {
      icon: GrHostMaintenance,
      title: "Maintenance et Support de Site Web",
      description:
        "Le succès d'un site web dépend d'une maintenance fiable. J'offre un support continu pour maintenir votre site web en bon fonctionnement, incluant l'optimisation des performances, les mises à jour de sécurité, et les mises à jour de contenu, afin que vous puissiez vous concentrer sur votre entreprise pendant que je m'occupe de l'aspect technique.",
    },
  ],
};

export const ServiceSection = () => {
  const { t, language } = useTranslation("homePage.serviceSection");

  const headings = t("title").split("$$$");

  return (
    <HomepageSection
      className="service-section"
      headings={headings}
      description={t("description")}
    >
      <>
        {serviceList[language as keyof typeof serviceList].map((service) => (
          <Card
            key={service.title}
            icon={<service.icon />}
            title={service.title}
            description={service.description}
          />
        ))}
      </>
      <div className="background-art left"></div>
      <div className="background-art right"></div>
    </HomepageSection>
  );
};
