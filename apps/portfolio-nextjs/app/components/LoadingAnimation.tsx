import { Logo } from "@notadream/react";

export const LoadingAnimation = () => {
  return (
    <div className="loading-animation">
      <Logo
        src={"/nabin-logo.svg"}
        alt="Loading logo..."
        size="large"
        className="loader-logo"
      />
    </div>
  );
};
