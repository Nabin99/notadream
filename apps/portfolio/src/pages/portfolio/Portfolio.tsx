import { Page, RouterLink, useTranslation } from "@notadream/react";

import { Project } from "./projects";
import portfolioImage from "../../assets/images/admin.webp";
import { ContentBox } from "../../components";
import { Profile } from "../../components/Profile";

const experience = [
  {
    role: "Software Developer Freelancer",
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
      "Led development of critical product features, ensuring software quality through comprehensive design and documentation standards, while optimizing scalability using modern frameworks.",
      "Built robust back-end services with Node.js and PostgreSQL, resolving customer issues by creating scalable solutions supporting business growth and operational reliability.",
      "Exhibited problem-solving and critical thinking by resolving complex issues related to integration of secure authentication systems, using Supertokens and enhancing team productivity by 10%.",
      "Developed and maintained reusable JavaScript packages and modules, contributing to npm registry.",
      "Deployed containerized applications and established CI/CD pipelines with GitLab CI, improving workflow efficiency by 30% and displaying time management and attention to detail.",
      "Promoted for leadership abilities, mentoring 5-6 team members, and driving collaboration across departments to provide high-quality results on time.",
      "Created and deployed different fastify and react library packages to npm registry",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Fintech Solutions",
    start: "Aug 2022",
    end: "Oct 2022",
    description: [
      'Collaborated with 3 cross-functional teams to develop the "iSend" Money Transfer application, implementing teamwork and problem-solving to ensure scalability of solution.',
      "Applied advanced React concepts, utilizing creativity and attention to detail to improve performance and responsiveness of web applications built with javascript.",
      "Maintained communication with stakeholders, achieving tailored solutions while adhering to project requirements and demonstrating adaptability in fast-paced 24/7 environments.",
      "Provided ongoing support and maintenance for clients, ensuring optimal performance and user experience.",
      "Managed project timelines, budgets, and resources to deliver high-quality solutions on time and within budget.",
      "Showcased strong conflict resolution and teamwork skills in an Agile environment, ensuring hundreds of customer issues were fixed promptly and efficiently during project lifecycle.",
      "Delivered an optimized one frontend application successfully",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Optimum Futurist",
    start: "Apr 2022",
    end: "Jul 2022",
    description: [
      "Work with a team of 11 trainees in developing an HR and Event Management System, utilizing leadership and collaboration to meet tight project deadlines.",
      "Displayed continuous learning by applying TypeScript and React in developing dynamic, scalable systems while managing state efficiently within frameworks.",
      "Managed project timelines, budgets, and resources to deliver high-quality solutions on time and within budget.",
    ],
  },
];

const education = [
  {
    title: "Full Stack Software Development",
    degree: "Diploma",
    description:
      "In-depth program focusing on full-stack software development, encompassing front-end technologies, back-end frameworks, database management, and deployment strategies. Highlights include mastering modern development tools, version control systems, and software testing methodologies, with an emphasis on building scalable and efficient applications.",
    institution: "Lambton College",
    start: "May 2024",
    end: "Expected Graduation: Jan 2026",
  },
  {
    title: "Bachelor of Science in Computer Science and Information Technology",
    degree: "Bachelor's Degree",
    description:
      "Comprehensive foundation in computer science, covering key areas such as Data Structures and Algorithms, Object-Oriented Programming (C++ and Java), Software Engineering, Artificial Intelligence, and Numerical Methods. Additional focus on Probability and Statistics, Discrete Mathematics, Linear Algebra, and Design and Analysis of Algorithms to develop problem-solving and analytical skills.",
    institution: "Tribhuvan University",
    start: "November 2017",
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
    name: "Fastify Package Library",
    site: "https://github.com/dzangolab/fastify",
    description:
      "Developed and maintained NPM libraries for reusable methods, utilities and functions , streamlining development processes.",
  },
  {
    name: "React Package Library",
    site: "https://github.com/dzangolab/react",
    description:
      "Developed and maintained NPM libraries for reusable components, streamlining development processes.",
  },
  {
    name: "iSend Money Transfer Application",
    site: "https://isendremit.com",
    description:
      "A modern and simple website for iSend Money Transfer with a responsive design using Nextjs and Reactjs.",
  },
  {
    name: "Flavor Fusion Web Application",
    site: "https://github.com/Nabin99/FlavourFusion",
    description:
      "A responsive platform for food enthusiasts with dynamic content, user authentication, and interactive features using HTML, CSS, JavaScript, and Python.",
  },
  {
    name: "Dumpling Mobile Application",
    site: "https://github.com/Nabin99/Dumpling-App",
    description:
      "A mobile app for food lovers to discover and share recipes, featuring real-time updates, user profiles, and social sharing using React Native and Firebase.",
  },
  {
    name: "Dumpling API Application",
    site: "https://github.com/Nabin99/DumplingStoreAPI",
    description:
      " A RESTful API for a food delivery service, enabling users to browse, order, and track deliveries using Node.js, Express, and MongoDB.",
  },
  {
    name: "Nepal Express Website",
    site: "https://focused-dijkstra-857903.netlify.app/",
    description:
      "A comprehensive website for a fictional courier service, featuring real-time tracking, user authentication, and responsive design using React and Node.js. build from scratch for my college major project.",
  },
  {
    name: "Pashupatinath Films Production Website",
    site: "https://pashupatinathfilmsproduction.com/",
    description:
      "A modern and simple website for Pashupatinath Films Production with a responsive design using html, css, and javascript.",
  },
  {
    name: "Ace Events Website",
    site: "https://ace-events.ca",
    description:
      "A modern and simple website for ace events with a responsive design using html, css, and javascript.",
  },
];

export const Portfolio = () => {
  const { t } = useTranslation("portfolioPage");

  return (
    <Page className="portfolio">
      <ContentBox>
        <section className="portfolio-intro">
          <Profile src={portfolioImage} alt="Nabin Dhital" />
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
            <RouterLink to="/contact" variant="borderless">
              {t("contact.link")}
            </RouterLink>
          </p>
        </section>
      </ContentBox>
    </Page>
  );
};
