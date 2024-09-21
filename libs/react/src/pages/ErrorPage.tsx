import React from "react";
import { useNavigate } from "react-router-dom";

// import { Button } from "../ui";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <p className="error-subtitle">Page Not Found</p>
        <p className="error-message">
          {"We can't seem to find the page you're looking for."}
        </p>
        <button className="error-button" onClick={handleGoHome}>
          Back to Home
        </button>
      </div>
      <div className="error-graphic">
        {/* Optionally, add an SVG or a decorative image */}
      </div>
    </div>
  );
};
