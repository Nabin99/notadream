import { Page, RouterLink, useTranslation } from "@notadream/react";

import { Project } from "./projects";
import portfolioImage from "../assets/images/admin.webp";
import { ContentBox } from "../components";
import { Profile } from "../components/Profile";

import "../assets/css/pages/portfolio/index.css";

const experience = {
  en: [
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
      start: "Aug 2021",
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
      start: "Apr 2021",
      end: "Jul 2021",
      description: [
        "Work with a team of 11 trainees in developing an HR and Event Management System, utilizing leadership and collaboration to meet tight project deadlines.",
        "Displayed continuous learning by applying TypeScript and React in developing dynamic, scalable systems while managing state efficiently within frameworks.",
        "Managed project timelines, budgets, and resources to deliver high-quality solutions on time and within budget.",
      ],
    },
  ],
  fr: [
    {
      role: "Développeur logiciel indépendant",
      company: "Freelance",
      start: "Avr 2024",
      end: "Présent",
      description: [
        "Développement d'applications évolutives, mise en place de pipelines CI/CD, et travail avec Fastify, Express et React.",
        "Collaboration avec des clients pour fournir des solutions personnalisées, y compris des plateformes e-commerce, des applications web et mobiles.",
        "Optimisation de sites web pour le SEO, amélioration du classement dans les moteurs de recherche et augmentation du trafic organique.",
        "Assistance et maintenance continues pour les clients, garantissant des performances optimales et une bonne expérience utilisateur.",
        "Gestion des délais, budgets et ressources des projets pour fournir des solutions de haute qualité dans les temps et dans les limites budgétaires.",
      ],
    },
    {
      role: "Développeur logiciel",
      company: "Dzango Technologies",
      start: "Nov 2022",
      end: "Avr 2024",
      description: [
        "Dirigé le développement de fonctionnalités clés du produit, assurant la qualité logicielle grâce à des normes complètes de conception et de documentation, tout en optimisant l’évolutivité avec des frameworks modernes.",
        "Création de services back-end robustes avec Node.js et PostgreSQL, résolution de problèmes clients en créant des solutions évolutives soutenant la croissance et la fiabilité de l'entreprise.",
        "Résolution de problèmes complexes liés à l'intégration de systèmes d'authentification sécurisés avec Supertokens, tout en améliorant la productivité de l’équipe de 10 %.",
        "Développement et maintenance de modules JavaScript réutilisables, contribution au registre npm.",
        "Déploiement d'applications conteneurisées et mise en place de pipelines CI/CD avec GitLab CI, améliorant l'efficacité du flux de travail de 30 % grâce à une bonne gestion du temps et une grande attention aux détails.",
        "Promu pour ses qualités de leadership, encadrement de 5 à 6 membres de l'équipe et promotion de la collaboration interservices pour fournir des résultats de qualité dans les délais.",
        "Création et déploiement de différentes bibliothèques Fastify et React dans le registre npm.",
      ],
    },
    {
      role: "Développeur Frontend",
      company: "Fintech Solutions",
      start: "Août 2021",
      end: "Oct 2022",
      description: [
        "Collaboration avec 3 équipes pluridisciplinaires pour développer l'application de transfert d'argent \"iSend\", en appliquant le travail d’équipe et la résolution de problèmes pour garantir l'évolutivité de la solution.",
        "Utilisation de concepts avancés de React, en faisant preuve de créativité et d’attention aux détails pour améliorer les performances et la réactivité des applications web en JavaScript.",
        "Maintien de la communication avec les parties prenantes pour proposer des solutions sur mesure en respectant les exigences du projet et en s'adaptant à des environnements dynamiques en continu (24/7).",
        "Assistance et maintenance continues pour les clients, assurant des performances optimales et une bonne expérience utilisateur.",
        "Gestion des délais, budgets et ressources des projets pour livrer des solutions de qualité dans les délais et le budget.",
        "Mise en œuvre de solides compétences en résolution de conflits et travail d'équipe dans un environnement Agile, assurant une résolution rapide et efficace de centaines de problèmes clients pendant tout le cycle de vie du projet.",
        "Livraison réussie d’une application frontend optimisée.",
      ],
    },
    {
      role: "Stagiaire en ingénierie logicielle",
      company: "Optimum Futurist",
      start: "Avr 2021",
      end: "Juil 2021",
      description: [
        "Travail avec une équipe de 11 stagiaires sur le développement d’un système de gestion RH et d’événements, en démontrant du leadership et de la collaboration pour respecter les délais serrés.",
        "Apprentissage continu en utilisant TypeScript et React pour développer des systèmes dynamiques et évolutifs tout en gérant efficacement l'état dans les frameworks.",
        "Gestion des délais, budgets et ressources pour livrer des solutions de qualité dans les temps et selon le budget.",
      ],
    },
  ],
};

const education = {
  en: [
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
      title:
        "Bachelor of Science in Computer Science and Information Technology",
      degree: "Bachelor's Degree",
      description:
        "Comprehensive foundation in computer science, covering key areas such as Data Structures and Algorithms, Object-Oriented Programming (C++ and Java), Software Engineering, Artificial Intelligence, and Numerical Methods. Additional focus on Probability and Statistics, Discrete Mathematics, Linear Algebra, and Design and Analysis of Algorithms to develop problem-solving and analytical skills.",
      institution: "Tribhuvan University",
      start: "November 2017",
      end: "November 2021",
    },
  ],
  fr: [
    {
      title: "Développement de logiciels Full Stack",
      degree: "Diplôme",
      description:
        "Programme approfondi axé sur le développement de logiciels full stack, incluant les technologies front-end, les frameworks back-end, la gestion de bases de données et les stratégies de déploiement. Points forts : maîtrise des outils de développement modernes, des systèmes de contrôle de version et des méthodes de test logiciel, avec un accent sur la création d'applications évolutives et efficaces.",
      institution: "Lambton College",
      start: "Mai 2024",
      end: "Diplôme prévu : Janvier 2026",
    },
    {
      title: "Licence en Informatique et Technologies de l’Information",
      degree: "Licence",
      description:
        "Fondation complète en informatique, couvrant des domaines clés tels que les structures de données et les algorithmes, la programmation orientée objet (C++ et Java), l'ingénierie logicielle, l'intelligence artificielle et les méthodes numériques. Focus supplémentaire sur les probabilités et statistiques, les mathématiques discrètes, l'algèbre linéaire, et la conception et l’analyse d’algorithmes afin de développer des compétences en résolution de problèmes et en analyse.",
      institution: "Université de Tribhuvan",
      start: "Novembre 2017",
      end: "Novembre 2021",
    },
  ],
};

const technicalSkills = {
  en: [
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
  ],
  fr: [
    // Langages de programmation
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C",

    // Développement Frontend
    "React.js",
    "React Native",
    "HTML5",
    "CSS3",
    "SASS/SCSS",

    // Développement Backend
    "Node.js",
    "Express.js",
    "Fastify",

    // Bases de données
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Base de données Oracle",

    // DevOps et outils
    "AWS",
    "Azure",
    "Docker",
    "Pipelines CI/CD",
    "NPM",

    // Contrôle de version
    "Git",
    "GitHub",
    "Bitbucket",

    // Tests et débogage
    "Jest",
    "Mocha",
    "Postman",
    "Outils de développement du navigateur",

    // Autres outils et technologies
    "Webpack",
    "Babel",
    "API REST",
    "GraphQL",
    "JSON",

    // Pratiques de développement logiciel
    "Développement Agile",
    "Méthodologie Scrum",
    "TDD (Développement piloté par les tests)",
    "Architecture MVC",

    // Compétences supplémentaires
    "Optimisation SEO",
    "Conception Web Responsive",
    "Optimisation des performances",
    "Accessibilité (WCAG)",
    "Principes UI/UX",
    "Structures de données et algorithmes",
  ],
};

const softSkills = {
  en: [
    // Communication Skills
    "Communication",
    "Active Listening",
    "Non-verbal Communication",
    "Empathy",

    // Interpersonal Skills
    "Teamwork",
    "Collaboration",
    "Conflict Resolution",
    "Relationship Building",

    // Leadership Skills
    "Decision-Making",
    "Coaching and Mentoring",
    "Vision Setting",

    // Problem-Solving and Critical Thinking
    "Analytical Thinking",
    "Creativity",
    "Adaptability",
    "Logical Reasoning",

    // Work Ethic and Professionalism
    "Time Management",
    "Reliability",
    "Accountability",
    "Goal Setting",

    // Adaptability and Flexibility
    "Open-Mindedness",
    "Ability to Learn New Skills",
    "Handling Ambiguity",
    "Growth Mindset",

    // Technical Collaboration
    "Cross-Functional Collaboration",
    "Customer-Centric Thinking",
    "Understanding Feedback",

    // Creativity and Innovation
    "Brainstorming",
    "Design Thinking",

    // Emotional Intelligence
    "Self-Awareness",
    "Relationship Management",
    "Stress Management",
  ],
  fr: [
    // Compétences en communication
    "Communication",
    "Écoute active",
    "Communication non verbale",
    "Empathie",

    // Compétences interpersonnelles
    "Travail d'équipe",
    "Collaboration",
    "Résolution de conflits",
    "Création de relations",

    // Compétences en leadership
    "Prise de décision",
    "Coaching et mentorat",
    "Définition d'une vision",

    // Résolution de problèmes et pensée critique
    "Pensée analytique",
    "Créativité",
    "Adaptabilité",
    "Raisonnement logique",

    // Éthique de travail et professionnalisme
    "Gestion du temps",
    "Fiabilité",
    "Responsabilité",
    "Définition d'objectifs",

    // Adaptabilité et flexibilité
    "Ouverture d'esprit",
    "Capacité à apprendre de nouvelles compétences",
    "Gestion de l’ambiguïté",
    "État d'esprit de croissance",

    // Collaboration technique
    "Collaboration interfonctionnelle",
    "Approche centrée sur le client",
    "Compréhension des retours",

    // Créativité et innovation
    "Remue-méninges",
    "Pensée design",

    // Intelligence émotionnelle
    "Conscience de soi",
    "Gestion des relations",
    "Gestion du stress",
  ],
};

const projects = {
  en: [
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
  ],
  fr: [
    {
      name: "Bibliothèque de packages Fastify",
      site: "https://github.com/dzangolab/fastify",
      description:
        "Développement et maintenance de bibliothèques NPM pour des méthodes, utilitaires et fonctions réutilisables, rationalisant les processus de développement.",
    },
    {
      name: "Bibliothèque de packages React",
      site: "https://github.com/dzangolab/react",
      description:
        "Développement et maintenance de bibliothèques NPM pour des composants réutilisables, rationalisant les processus de développement.",
    },
    {
      name: "Application de transfert d'argent iSend",
      site: "https://isendremit.com",
      description:
        "Un site web moderne et simple pour iSend Money Transfer avec un design réactif utilisant Next.js et React.js.",
    },
    {
      name: "Application web Flavor Fusion",
      site: "https://github.com/Nabin99/FlavourFusion",
      description:
        "Une plateforme réactive pour les passionnés de cuisine avec du contenu dynamique, une authentification utilisateur et des fonctionnalités interactives utilisant HTML, CSS, JavaScript et Python.",
    },
    {
      name: "Application mobile Dumpling",
      site: "https://github.com/Nabin99/Dumpling-App",
      description:
        "Une application mobile pour les amateurs de cuisine afin de découvrir et partager des recettes, avec mises à jour en temps réel, profils utilisateurs et partage social, utilisant React Native et Firebase.",
    },
    {
      name: "Application API Dumpling",
      site: "https://github.com/Nabin99/DumplingStoreAPI",
      description:
        "Une API RESTful pour un service de livraison de repas, permettant aux utilisateurs de parcourir, commander et suivre les livraisons en utilisant Node.js, Express et MongoDB.",
    },
    {
      name: "Site web Nepal Express",
      site: "https://focused-dijkstra-857903.netlify.app/",
      description:
        "Un site web complet pour un service de messagerie fictif, avec suivi en temps réel, authentification utilisateur et design réactif, construit à partir de zéro pour mon projet de fin d'études, utilisant React et Node.js.",
    },
    {
      name: "Site web de Pashupatinath Films Production",
      site: "https://pashupatinathfilmsproduction.com/",
      description:
        "Un site web moderne et simple pour Pashupatinath Films Production avec un design réactif utilisant HTML, CSS et JavaScript.",
    },
    {
      name: "Site web Ace Events",
      site: "https://ace-events.ca",
      description:
        "Un site web moderne et simple pour Ace Events avec un design réactif utilisant HTML, CSS et JavaScript.",
    },
  ],
};

export const Portfolio = () => {
  const { t, language } = useTranslation("portfolioPage");

  return (
    <Page className="portfolio">
      <ContentBox>
        <section className="portfolio-intro">
          <Profile src={portfolioImage.src} alt="Nabin Dhital" />
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
          {experience[language as keyof typeof experience]?.map(
            (exp, index) => (
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
            )
          )}
        </section>

        {/* Education Section */}
        <section className="portfolio-timeline education">
          <h2>{t("education.title")}</h2>
          {education[language as keyof typeof education]?.map((edu, index) => (
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
              {technicalSkills[language as keyof typeof technicalSkills]?.map(
                (skill, index) => <li key={index}>{skill}</li>
              )}
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
              {softSkills[language as keyof typeof softSkills]?.map(
                (skill, index) => <li key={index}>{skill}</li>
              )}
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
            {projects[language as keyof typeof projects]?.map(
              (project, index) => (
                <Project
                  key={index}
                  name={project.name}
                  description={project.description}
                  site={project.site}
                />
              )
            )}
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

export default Portfolio;
