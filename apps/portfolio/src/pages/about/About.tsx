import { Page, RouterLink } from "@notadream/react";

import { ContentBox } from "../../components";

export const About = () => {
  return (
    <Page className="about">
      <section className="about-intro">
        <ContentBox>
          <img
            className="about-intro-image"
            src="/images/aboutme-intro.webp"
            alt="Nabin Dhital"
          />
          <div className="about-intro-content">
            <h1>
              A Developer with a <span>Vision</span>
            </h1>
            <p>
              Hi, I{"'"}m Nabin Dhital, a dedicated Full-Stack Developer with a
              knack for building seamless web and mobile experiences.With
              experience in React, Express, Fastify, Docker, CI/CD pipelines,
              and databases, My mission is to craft solutions that not only look
              stunning but also deliver functionality and scalability.
            </p>
            <p>
              From my early days of exploring computers to mastering Full Stack
              web development, my journey has been fueled by curiosity and the
              thrill of building something impactful...
            </p>
          </div>
        </ContentBox>
      </section>

      <ContentBox>
        <section className="about-philosophy text-quote">
          I believe in clean, maintainable code, and solutions that grow with
          your business. My approach is collaborative, ensuring that the end
          product aligns with your vision and goals.
        </section>
        <section className="about-who">
          <h2>
            Who <br />
            <span>
              I Am <br />
            </span>
            ?
          </h2>
          <p>
            I{"’"}m currently pursuing Full-Stack Software Development at
            Lambton College and hold a Bachelor{"’"}s degree in Computer Science
            and Information Technology from Tribhuvan University. My
            professional journey includes working as a Frontend Developer at
            Fintech Solutions and a Software Developer at Dzango Technologies,
            where I honed my skills in developing seamless user interfaces and
            robust backend systems.
          </p>
        </section>
        <div className="about-accomplishments">
          <section className="about-achievements">
            <h2>
              <span>Achievements</span> and <span>Skills</span>
            </h2>
            <ul>
              <li>
                <p>
                  Awarded Best Performer of the Intern Award during my
                  internship, showcasing my commitment to excellence.
                </p>
              </li>
              <li>
                <p>
                  Maintained an NPM registry application and package library for
                  in-house projects at my last job.
                </p>
              </li>
              <li>
                <p>
                  Proficient in React, Express, Fastify, Docker, and Azure, and
                  adaptable to new tools and technologies.
                </p>
              </li>
            </ul>
          </section>
          <div className="about-stats">
            <div className="stat-item">
              <h2>
                Projects <span>Completed</span>
              </h2>
              <p>8+</p>
            </div>
            {/* <div className="stat-item">
              <h2>
                Technologies <span>Used</span>
              </h2>
              <p>React, Node.js, Python, JavaScript, SQL</p>
            </div> */}
            <div className="stat-item">
              <h2>
                Years of <span>Experience</span>
              </h2>
              <p>3+</p>
            </div>
          </div>
        </div>
        <div className="about-drive-personal">
          <section className="about-drive">
            <h2>
              What Drives <span>Me</span>
            </h2>
            <p>
              Innovation, creativity, and user-centric design are at the core of
              my work. Whether it{`'`}s building responsive web platforms,
              optimizing applications for performance, or enhancing search
              engine visibility, I aim to solve challenges with elegance and
              efficiency.
            </p>
          </section>
          <section className="about-personal">
            <h2>
              Outside of <span>Work</span>
            </h2>
            <p>
              When I’m not coding, I enjoy photography, exploring new creative
              tools like Photoshop and After Effects, and brainstorming unique
              solutions to everyday challenges. Also a fan of hiking, I love to
              be in nature and explore new trails. Currently, I am cooking up a
              storm in the kitchen, experimenting with new recipes and cuisines.
            </p>
          </section>
        </div>
        <section className="about-connect">
          <h2>
            Get <br />
            in
            <span> Touch</span>
          </h2>
          <p className="text-quote">
            Feel free to reach out—I’d love to discuss how I can help bring your
            ideas to reality!
            <RouterLink to="/contact" variant="borderless">
              Let’s Connect
            </RouterLink>
          </p>
        </section>
        {/* Feel free to reach out—I’d love to discuss how I can help bring your
        ideas to reality!
        <RouterLink to="/contact" variant="borderless">
          Let’s Connect
        </RouterLink> */}
      </ContentBox>
    </Page>
  );
};
