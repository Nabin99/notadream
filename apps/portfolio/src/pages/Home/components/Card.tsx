import React, { ReactNode } from "react";

interface WhyCardProperties {
  title: string;
  description: string;
  icon: ReactNode;
}

export const Card: React.FC<WhyCardProperties> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="why-card">
      <h3>
        <span>{icon}</span>
        {title}
      </h3>
      <p>{description}</p>
    </div>
  );
};
