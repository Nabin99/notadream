"use client";

import { useState, useEffect } from "react";
import {
  BrowserLink,
  Page,
  RouterLink,
  useTranslation,
} from "@notadream/react";

import portfolioImage from "../assets/images/admin.webp";
import { ContentBox } from "../components";
import { Profile } from "../components/Profile";
import {
  useExperience,
  useEducation,
  useSkills,
  useProjects,
} from "../utils/hooks/useFirebase";

import "../assets/css/pages/portfolio/index.css";

// ============================================
// FALLBACK DATA (used when Firebase unavailable)
// ============================================

const FALLBACK_SKILLS_EN = [
  "JavaScript", "TypeScript", "Python", "Java", "C",
  "React.js", "React Native", "HTML5", "CSS3", "SASS/SCSS",
  "Node.js", "Express.js", "Fastify",
  "MongoDB", "MySQL", "PostgreSQL", "Oracle Database",
  "AWS", "Azure", "Docker", "CI/CD Pipelines", "NPM",
  "Git", "GitHub", "Bitbucket",
  "Jest", "Mocha", "Postman", "Browser DevTools",
  "Webpack", "Babel", "REST APIs", "GraphQL", "JSON",
  "Agile Development", "Scrum Methodology", "TDD (Test-Driven Development)", "MVC Architecture",
  "SEO Optimization", "Responsive Web Design", "Performance Tuning", "Accessibility (WCAG)", "UI/UX Principles", "Data Structures and Algorithms",
];

const FALLBACK_SKILLS_FR = [
  "JavaScript", "TypeScript", "Python", "Java", "C",
  "React.js", "React Native", "HTML5", "CSS3", "SASS/SCSS",
  "Node.js", "Express.js", "Fastify",
  "MongoDB", "MySQL", "PostgreSQL", "Base de données Oracle",
  "AWS", "Azure", "Docker", "Pipelines CI/CD", "NPM",
  "Git", "GitHub", "Bitbucket",
  "Jest", "Mocha", "Postman", "Outils de développement du navigateur",
  "Webpack", "Babel", "API REST", "GraphQL", "JSON",
  "Développement Agile", "Méthodologie Scrum", "TDD (Développement piloté par les tests)", "Architecture MVC",
  "Optimisation SEO", "Conception Web Responsive", "Optimisation des performances", "Accessibilité (WCAG)", "Principes UI/UX", "Structures de données et algorithmes",
];

const FALLBACK_SOFT_SKILLS_EN = [
  "Communication", "Active Listening", "Non-verbal Communication", "Empathy",
  "Teamwork", "Collaboration", "Conflict Resolution", "Relationship Building",
  "Decision-Making", "Coaching and Mentoring", "Vision Setting",
  "Analytical Thinking", "Creativity", "Adaptability", "Logical Reasoning",
  "Time Management", "Reliability", "Accountability", "Goal Setting",
  "Open-Mindedness", "Ability to Learn New Skills", "Handling Ambiguity", "Growth Mindset",
  "Cross-Functional Collaboration", "Customer-Centric Thinking", "Understanding Feedback",
  "Brainstorming", "Design Thinking",
  "Self-Awareness", "Relationship Management", "Stress Management",
];

const FALLBACK_SOFT_SKILLS_FR = [
  "Communication", "Écoute active", "Communication non verbale", "Empathie",
  "Travail d'équipe", "Collaboration", "Résolution de conflits", "Création de relations",
  "Prise de décision", "Coaching et mentorat", "Définition d'une vision",
  "Pensée analytique", "Créativité", "Adaptabilité", "Raisonnement logique",
  "Gestion du temps", "Fiabilité", "Responsabilité", "Définition d'objectifs",
  "Ouverture d'esprit", "Capacité à apprendre de nouvelles compétences", "Gestion de l'ambiguïté", "État d'esprit de croissance",
  "Collaboration interfonctionnelle", "Approche centrée sur le client", "Compréhension des retours",
  "Remue-méninges", "Pensée design",
  "Conscience de soi", "Gestion des relations", "Gestion du stress",
];

// ============================================
// COMPONENTS
// ============================================

interface ProjectProps {
  name: string;
  description: string;
  site: string;
}

const Project: React.FC<ProjectProps> = ({ name, description, site }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="side front">{name}</div>
        <div className="side back">
          <p>{description}</p>
          <BrowserLink href={site} target="_blank">
            View Project
          </BrowserLink>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-4 animate-pulse">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="h-20 bg-gray-300 rounded"></div>
    ))}
  </div>
);

const ErrorMessage: React.FC<{ error: string; isCached?: boolean }> = ({
  error,
  isCached,
}) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
    <p className="text-sm text-yellow-800">
      ⚠️ {error}
      {isCached && " (Using cached data)"}
    </p>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================

export const Portfolio = () => {
  const { t, language } = useTranslation("portfolioPage");
  const { data: firestoreExperience, loading: expLoading, error: expError, isCached: expCached } = useExperience();
  const { data: firestoreEducation, loading: eduLoading, error: eduError, isCached: eduCached } = useEducation();
  const { technicalSkills, softSkills, loading: skillsLoading, error: skillsError, isCached: skillsCached } = useSkills();
  const { data: firestoreProjects, loading: projLoading, error: projError, isCached: projCached } = useProjects();
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const experience = firestoreExperience?.length ? firestoreExperience : [];
  const education = firestoreEducation?.length ? firestoreEducation : [];
  const technical = technicalSkills?.length ? technicalSkills.map(s => s.name) : (language === 'fr' ? FALLBACK_SKILLS_FR : FALLBACK_SKILLS_EN);
  const soft = softSkills?.length ? softSkills.map(s => s.name) : (language === 'fr' ? FALLBACK_SOFT_SKILLS_FR : FALLBACK_SOFT_SKILLS_EN);
  const projects = firestoreProjects?.length ? firestoreProjects : [];

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
          {expError && <ErrorMessage error={expError} isCached={expCached} />}
          {expLoading ? (
            <LoadingSkeleton count={3} />
          ) : experience.length > 0 ? (
            experience.map((exp, index) => (
              <div key={exp.id || index}>
                <h3>{exp.role}</h3>
                <p>
                  {exp.company}
                  <span>
                    {exp.start} - {exp.end}
                  </span>
                </p>
                <p className="description">
                  {exp.description.map((desc, descIndex) => (
                    <span key={`exp-${index}-${descIndex}`}>{desc}</span>
                  ))}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Experience data not configured in Firestore</p>
          )}
        </section>

        {/* Education Section */}
        <section className="portfolio-timeline education">
          <h2>{t("education.title")}</h2>
          {eduError && <ErrorMessage error={eduError} isCached={eduCached} />}
          {eduLoading ? (
            <LoadingSkeleton count={2} />
          ) : education.length > 0 ? (
            education.map((edu, index) => (
              <div key={edu.id || index}>
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
            ))
          ) : (
            <p className="text-gray-500">Education data not configured in Firestore</p>
          )}
          <div className="background-art left"></div>
          <div className="background-art right"></div>
        </section>

        {/* Technical Skills Section */}
        <section className="portfolio-skills">
          <h2>
            {t("skillsTechnical.title").split("$$$")[0]}
            <span>{t("skillsTechnical.title").split("$$$")[1]}</span>
          </h2>
          {skillsError && <ErrorMessage error={skillsError} isCached={skillsCached} />}
          {skillsLoading ? (
            <LoadingSkeleton count={1} />
          ) : (
            <div>
              <ul>
                {technical.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Soft Skills Section */}
        <section className="portfolio-skills">
          <h2>
            {t("skillsSoft.title").split("$$$")[0]}
            <span>{t("skillsSoft.title").split("$$$")[1]}</span>
          </h2>
          <div>
            <ul>
              {soft.map((skill, index) => (
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
          {projError && <ErrorMessage error={projError} isCached={projCached} />}
          {projLoading ? (
            <LoadingSkeleton count={3} />
          ) : projects.length > 0 ? (
            <div>
              {projects.map((project, index) => (
                <Project
                  key={project.id || index}
                  name={project.name}
                  description={project.description}
                  site={project.site}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Projects data not configured in Firestore</p>
          )}
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
