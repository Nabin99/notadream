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
              Where Passion Meets <span>Code</span>
            </h1>
            <p>
              Hi, I{"'"}m Nabin Dhital, a dedicated Full-Stack Developer with a
              knack for building seamless web and mobile experiences. My mission
              is to craft solutions that not only look stunning but also deliver
              functionality and scalability.
            </p>
            <br />
            <p>
              From my early days of exploring computers to mastering Full Stack
              web development, my journey has been fueled by curiosity and the
              thrill of building something impactful...
            </p>
          </div>
        </ContentBox>
      </section>

      <ContentBox>
        <section className="about-philosophy">
          <h2>
            My <span>Philosophy</span>
          </h2>
          <hr />
          <p>
            I believe in clean, maintainable code, and solutions that grow with
            your business. My approach is collaborative, ensuring that the end
            product aligns with your vision and goals.
          </p>
        </section>
        <section className="about-philosophy">
          <h2>
            Who <span>I Am</span>
          </h2>
          <hr />
          <p>
            With a background in computer science and hands-on experience in
            cutting-edge technologies, I specialize in designing, developing,
            and optimizing digital solutions. From concept to deployment, I
            thrive in every stage of the development lifecycle.
          </p>
        </section>

        <section className="about-stats">
          <div className="stat-item">
            <h2>
              Projects <span>Completed</span>
            </h2>
            <p>25+</p>
          </div>
          <div className="stat-item">
            <h2>
              Technologies <span>Used</span>
            </h2>
            <p>React, Node.js, Python, JavaScript, SQL</p>
          </div>
          <div className="stat-item">
            <h2>
              Years of <span>Experience</span>
            </h2>
            <p>3+</p>
          </div>
        </section>

        <section className="about-philosophy">
          <h2>
            What Drives <span>Me</span>
          </h2>
          <hr />
          <p>
            Innovation, creativity, and user-centric design are at the core of
            my work. Whether it{`'`}s building responsive web platforms,
            optimizing applications for performance, or enhancing search engine
            visibility, I aim to solve challenges with elegance and efficiency.
          </p>
        </section>

        <section className="about-values">
          <h2>
            What I Value in a <span>Project</span>
          </h2>
          <hr />
          <p>
            I love working on projects that challenge me to push my limits,
            prioritize user experience, and make a meaningful impact...
          </p>
        </section>

        <section className="about-personal">
          <h2>
            Outside of <span>Work</span>
          </h2>
          <hr />
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
