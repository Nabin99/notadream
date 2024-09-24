import React from "react";
import { BiSolidMessageAltError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { Page } from "./Page";
import { Button } from "../ui";
import { ErrorPageProperties } from "./type";

export const ErrorPage: React.FC<ErrorPageProperties> = ({
  title = "404",
  subtitle = "Page Not Found",
  errorMessage = "We can't seem to find the page you're looking for.",
  children,
  buttonLabel = ">> Back to Home ",
  badges,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Page
      className="error-page"
      title={title}
      subtitle={subtitle}
      badges={badges}
    >
      <>
        {children ? (
          children
        ) : (
          <>
            <span className="error-icon">
              <BiSolidMessageAltError />
            </span>
            <p className="error-message">{errorMessage}</p>

            <Button
              className="error-button"
              onClick={handleGoHome}
              size="medium"
              color="danger"
              variant="borderless"
              label={buttonLabel}
            ></Button>
          </>
        )}
      </>
    </Page>
  );
};
