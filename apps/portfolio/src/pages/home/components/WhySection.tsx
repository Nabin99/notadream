import { useTranslation } from "@notadream/react";
import { FaSquareCheck } from "react-icons/fa6";

import { Card } from "./Card";
import { HomepageSection } from "./HomepageSection";

const whyList = [
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
];

export const WhySection = () => {
  const { t } = useTranslation("homePage.whySection");

  const headings = t("title").split("$$$");

  return (
    <HomepageSection
      className="why-section"
      headings={headings}
      description={t("description")}
    >
      <>
        {whyList.map((why) => (
          <Card
            key={why.title}
            icon={<FaSquareCheck />}
            title={why.title}
            description={why.description}
          />
        ))}
      </>
    </HomepageSection>
  );
};
