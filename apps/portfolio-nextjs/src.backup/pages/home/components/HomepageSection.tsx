import { ContentBox } from "../../../components";

export const HomepageSection: React.FC<{
  className: string;
  headings: string[];
  description: string;
  children: React.ReactNode;
}> = ({ headings, description, children, className }) => {
  return (
    <section className={`homepage-section ${className}`.trimEnd()}>
      <ContentBox>
        <h2>
          {headings[0]} <span>{headings[1]}</span>
        </h2>

        <p>{description}</p>
        <hr />

        <div className="main-content">{children}</div>
      </ContentBox>
    </section>
  );
};
