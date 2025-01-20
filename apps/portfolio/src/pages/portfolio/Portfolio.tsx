import { BrowserLink, Page, useTranslation } from "@notadream/react";

import { Project } from "./projects";
import { ContentBox } from "../../components";
import { Profile } from "../../components/Profile";

const experience = [
  {
    role: "Software Engineer Freelancer",
    company: "Freelance",
    start: "Apr 2024",
    end: "Present",
    description: [
      "Developed scalable applications, implemented CI/CD pipelines, and worked with Fastify, Express, and React.",
      "Collaborated with clients to deliver custom solutions, including e-commerce platforms, web applications, and mobile apps.",
      "Optimized websites for SEO, improving search rankings and increasing organic traffic.",
      "Provided ongoing support and maintenance for clients, ensuring optimal performance and user experience.",
      "Managed project timelines, budgets, and resources to deliver high-quality solutions on time and within budget.",
    ],
  },
  {
    role: "Software Developer",
    company: "Dzango Technologies",
    start: "Nov 2022 ",
    end: "Apr 2024",
    description: [
      "Designed scalable applications, implemented CI/CD pipelines, and worked with Fastify, Express, and React.",
      "Collaborated with clients to deliver custom solutions, including e-commerce platforms, web applications, and mobile apps.",
      "Optimized websites for SEO, improving search rankings and increasing organic traffic.",
      "Provided ongoing support and maintenance for clients, ensuring optimal performance and user experience.",
      "Managed project timelines, budgets, and resources to deliver high-quality solutions on time and within budget.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Fintech Solutions",
    start: "Aug 2022",
    end: "Oct 2022",
    description: [
      "Worked on developing responsive web applications, maintained in-house NPM packages, and collaborated on a fintech solution project.",
      "Implemented SEO optimization strategies to improve website visibility and increase organic traffic.",
      "Collaborated with cross-functional teams to deliver high-quality solutions on time and within budget.",
      "Provided ongoing support and maintenance for clients, ensuring optimal performance and user experience.",
      "Managed project timelines, budgets, and resources to deliver high-quality solutions on time and within budget.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Optimum Futurist",
    start: "Apr 2022",
    end: "Jul 2022",
    description: [
      "Awarded Best Performer of the Intern Award for contributing to key projects with innovative solutions.",
      "Developed and maintained web applications, implemented CI/CD pipelines, and worked with Fastify, Express, and React.",
      "Collaborated with cross-functional teams to deliver high-quality solutions on time and within budget.",
      "Provided ongoing support and maintenance for clients, ensuring optimal performance and user experience.",
      "Managed project timelines, budgets, and resources to deliver high-quality solutions on time and within budget.",
    ],
  },
];

const education = [
  {
    title: "Full Stack Software Development",
    degree: "Diploma",
    description: "Diploma in Full Stack Software Development",
    institution: "Lambton College",
    start: "May 2024",
    end: "Expected Graduation: Jan 2026",
  },
  {
    title: "Bachelor of Science in Computer Science and Information Technology",
    degree: "Bachelor's Degree",
    description:
      "Bachelor of Science in Computer Science and Information Technology",
    institution: "Tribhuvan University",
    start: "November 2017 ",
    end: "November 2021",
  },
];

const technicalSkills = [
  // Programming Languages
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",

  // Frontend Development
  "React.js",
  "React Native",
  "HTML5",
  "CSS3",
  "SASS/SCSS",

  // Backend Development
  "Node.js",
  "Express.js",
  "Fastify",

  // Databases
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Oracle Database",

  // DevOps and Tools
  "AWS",
  "Azure",
  "Docker",
  "CI/CD Pipelines",
  "NPM",

  // Version Control
  "Git",
  "GitHub",
  "Bitbucket",

  // Testing and Debugging
  "Jest",
  "Mocha",
  "Postman",
  "Browser DevTools",

  // Other Tools and Technologies
  "Webpack",
  "Babel",
  "REST APIs",
  "GraphQL",
  "JSON",

  // Software Development Practices
  "Agile Development",
  "Scrum Methodology",
  "TDD (Test-Driven Development)",
  "MVC Architecture",

  // Additional Expertise
  "SEO Optimization",
  "Responsive Web Design",
  "Performance Tuning",
  "Accessibility (WCAG)",
  "UI/UX Principles",
  "Data Structures and Algorithms",
];

const softSkills = [
  // Communication Skills
  "Communication",
  "Active Listening",
  "Public Speaking",
  "Non-verbal Communication",
  "Empathy",

  // Interpersonal Skills
  "Teamwork",
  "Collaboration",
  "Conflict Resolution",
  "Networking",
  "Relationship Building",

  // Leadership Skills
  "Decision-Making",
  "Delegation",
  "Motivation",
  "Coaching and Mentoring",
  "Vision Setting",

  // Problem-Solving and Critical Thinking
  "Analytical Thinking",
  "Creativity",
  "Resourcefulness",
  "Adaptability",
  "Logical Reasoning",

  // Work Ethic and Professionalism
  "Time Management",
  "Reliability",
  "Accountability",
  "Goal Setting",
  "Resilience",

  // Adaptability and Flexibility
  "Open-Mindedness",
  "Ability to Learn New Skills",
  "Handling Ambiguity",
  "Staying Calm Under Pressure",
  "Growth Mindset",

  // Technical Collaboration
  "Translating Technical Concepts",
  "Cross-Functional Collaboration",
  "Customer-Centric Thinking",
  "Process Optimization",
  "Understanding Feedback",

  // Creativity and Innovation
  "Brainstorming",
  "Design Thinking",
  "Experimentation",
  "Visionary Thinking",
  "Storytelling",

  // Emotional Intelligence
  "Self-Awareness",
  "Empathy",
  "Relationship Management",
  "Stress Management",
  "Conflict De-escalation",
];

const projects = [
  {
    name: "Computer Games Website",
    site: "https://games-website.com",
    description:
      "A responsive platform for game enthusiasts with dynamic content, user authentication, and interactive features using HTML, CSS, JavaScript, and Express.",
  },
  {
    name: "In-House NPM Package Library",
    site: "https://npm-library.com",
    description:
      "Developed and maintained NPM libraries for reusable components, streamlining development processes.",
  },
  {
    name: "Computer Games Website",
    site: "https://games-website.com",
    description:
      "A responsive platform for game enthusiasts with dynamic content, user authentication, and interactive features using HTML, CSS, JavaScript, and Express.",
  },
  {
    name: "In-House NPM Package Library",
    site: "https://npm-library.com",
    description:
      "Developed and maintained NPM libraries for reusable components, streamlining development processes.",
  },
  {
    name: "Computer Games Website",
    site: "https://games-website.com",
    description:
      "A responsive platform for game enthusiasts with dynamic content, user authentication, and interactive features using HTML, CSS, JavaScript, and Express.",
  },
  {
    name: "In-House NPM Package Library",
    site: "https://npm-library.com",
    description:
      "Developed and maintained NPM libraries for reusable components, streamlining development processes.",
  },
];

export const Portfolio = () => {
  const { t } = useTranslation("portfolioPage");

  return (
    <Page className="portfolio">
      <ContentBox>
        <section className="portfolio-intro">
          <Profile src="/images/admin.webp" alt="Nabin Dhital" />
          <div className="portfolio-intro-content">
            <h1>
              {t("title").split("$$$")[0]}{" "}
              <span>{t("title").split("$$$")[1]}</span>
            </h1>
            <p>{t("description")}</p>
          </div>
          <div className="background-art left"></div>
          <div className="background-art right"></div>
        </section>

        {/* Experience Section */}
        <section className="portfolio-timeline experience">
          <h2>{t("experience.title")}</h2>
          {experience.map((exp, index) => (
            <div key={index}>
              <h3>{exp.role}</h3>
              <p>
                {exp.company}
                <span>
                  {exp.start} - {exp.end}
                </span>
              </p>

              <p className="description">
                {exp.description.map((description, index) => (
                  <span key={"descripton" + index}>{description}</span>
                ))}
              </p>
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="portfolio-timeline education">
          <h2>{t("education.title")}</h2>
          {education.map((edu, index) => (
            <div key={index}>
              <h3>{edu.title}</h3>
              <p>{edu.institution}</p>
              <p>
                <span>
                  {edu.start} - {edu.end}
                </span>
              </p>
              <p className="description">
                <span>{edu.description}</span>
              </p>
            </div>
          ))}
          <div className="background-art left"></div>
          <div className="background-art right"></div>
        </section>

        {/* Skills Section */}
        <section className="portfolio-skills">
          <h2>
            {t("skillsTechnical.title").split("$$$")[0]}
            <span>{t("skillsTechnical.title").split("$$$")[1]}</span>
          </h2>
          <div>
            <ul>
              {technicalSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Skills Section */}
        <section className="portfolio-skills">
          <h2>
            {t("skillsSoft.title").split("$$$")[0]}
            <span>{t("skillsSoft.title").split("$$$")[1]}</span>
          </h2>
          <div>
            <ul>
              {softSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Projects Section */}
        <section className="portfolio-projects">
          <h2>
            {t("projects.title").split("$$$")[0]}{" "}
            <span>{t("projects.title").split("$$$")[1]}</span>
          </h2>
          <div>
            {projects.map((project, index) => (
              <Project
                key={index}
                name={project.name}
                description={project.description}
                site={project.site}
              />
            ))}
          </div>
          <div className="background-art left"></div>
          <div className="background-art right"></div>
        </section>

        <section className="portfolio-connect">
          <h2>
            {t("contact.title").split("$$$")[0]} <br />
            {t("contact.title").split("$$$")[1]}
            <span>{t("contact.title").split("$$$")[2]}</span>
          </h2>
          <p className="text-quote">
            {t("contact.description")}
            <BrowserLink href="/contact" variant="borderless">
              {t("contact.link")}
            </BrowserLink>
          </p>
        </section>
      </ContentBox>
    </Page>
  );
};
