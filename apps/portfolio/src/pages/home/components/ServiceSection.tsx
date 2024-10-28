import { useTranslation } from "@notadream/react";
import { FaSquareCheck } from "react-icons/fa6";

import { Card } from "./Card";
import { HomepageSection } from "./HomepageSection";

const serviceList = [
  {
    title: "UI/UX Design",
    description:
      "Great digital products start with great design. I focus on creating intuitive, visually appealing user interfaces that elevate user experience. By understanding user needs and combining them with a clean, modern aesthetic, I build designs that engage users and align with your brand’s goals.",
  },
  {
    title: "Full Stack Web Development",
    description:
      "From the frontend interface to backend logic, I build complete web solutions that are both functional and scalable. Leveraging technologies like JavaScript, React, Node.js, and Python, I create websites that perform seamlessly across devices, with a focus on user experience and reliability.",
  },
  {
    title: "Mobile App Development",
    description:
      "With mobile-first in mind, I develop responsive, high-quality mobile applications for iOS and Android that offer users a smooth experience. I prioritize functionality and ease of use, creating apps that meet your business goals while enhancing user engagement.",
  },
  {
    title: "SEO Optimization and Strategy",
    description:
      "Effective SEO ensures your platform is discoverable by the right audience. I implement SEO best practices—including keyword integration, fast load times, and mobile responsiveness—to improve your search rankings, drive traffic, and create a lasting online presence.",
  },
  {
    title: "E-commerce Development",
    description:
      "For businesses looking to sell online, I develop secure, user-friendly e-commerce solutions. From setting up a streamlined product catalog to implementing smooth payment systems, I create e-commerce platforms that provide a top-tier shopping experience, focused on conversion and customer satisfaction.",
  },
  {
    title: "Website Maintenance & Support",
    description:
      "A website’s success depends on reliable maintenance. I offer ongoing support to keep your website running smoothly, including performance optimization, security updates, and content updates, so you can focus on your business while I handle the technical side.",
  },
];

export const ServiceSection = () => {
  const { t } = useTranslation("homePage.serviceSection");

  const headings = t("title").split("$$$");

  return (
    <HomepageSection
      className="service-section"
      headings={headings}
      description={t("description")}
    >
      <>
        {serviceList.map((service) => (
          <Card
            key={service.title}
            icon={<FaSquareCheck />}
            title={service.title}
            description={service.description}
          />
        ))}
      </>
    </HomepageSection>
  );
};
