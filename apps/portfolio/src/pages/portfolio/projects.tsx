import { BrowserLink } from "@notadream/react";

interface ProjectProperties {
  name: string;
  description: string;
  site: string;
}

export const Project: React.FC<ProjectProperties> = ({
  name,
  description,
  site,
}) => {
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
