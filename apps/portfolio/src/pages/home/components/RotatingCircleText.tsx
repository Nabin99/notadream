import React from "react";

interface RotatingCircleProperties {
  word: string;
}

export const RotatingCircle: React.FC<RotatingCircleProperties> = ({
  word,
}) => {
  return (
    <div className="circle-container">
      <div className="circle"></div>
      <span className="circle-text">{word}</span>
    </div>
  );
};
