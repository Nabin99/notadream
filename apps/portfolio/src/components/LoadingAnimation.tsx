import { Logo } from "@notadream/react";

import logo from "../assets/images/logo.svg";

export const LoadingAnimation = () => {
  return (
    <div className="loading-animation">
      <Logo
        src={logo}
        size="large"
        alt="Loading logo..."
        className="loader-logo"
      />
    </div>
  );
};
