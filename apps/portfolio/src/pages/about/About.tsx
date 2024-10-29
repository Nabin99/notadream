import { Page, RouterLink } from "@notadream/react";

import { ContentBox } from "../../components";

export const About = () => {
  return (
    <Page className="about">
      <ContentBox>
        <section className="about-intro">
          <h2>About Me</h2>
          <p>
            From my early days of exploring computers to mastering Full Stack
            web development, my journey has been fueled by curiosity and the
            thrill of building something impactful...
          </p>
        </section>

        <section className="about-philosophy">
          <h3>My Philosophy</h3>
          <p>
            I believe in a collaborative approach where every detail matters. My
            goal is to ensure that each project, no matter the scale, reflects a
            perfect balance...
          </p>
        </section>

        <section className="about-stats">
          <div className="stat-item">
            <h4>Projects Completed</h4>
            <p>25+</p>
          </div>
          <div className="stat-item">
            <h4>Technologies</h4>
            <p>React, Node.js, Python, JavaScript, SQL</p>
          </div>
          <div className="stat-item">
            <h4>Years of Experience</h4>
            <p>3+</p>
          </div>
        </section>

        <section className="about-values">
          <h3>What I Value in a Project</h3>
          <p>
            I love working on projects that challenge me to push my limits,
            prioritize user experience, and make a meaningful impact...
          </p>
        </section>

        <section className="about-personal">
          <h3>Outside of Work</h3>
          <p>
            When I’m not coding, I enjoy photography, exploring nature, and
            diving into tech blogs...
          </p>
        </section>

        <RouterLink to="/contact" variant="borderless">
          Get In Touch
        </RouterLink>
      </ContentBox>
    </Page>
  );
};
