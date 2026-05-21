import { Logo } from "@notadream/react";

import logo from "../assets/images/logo.svg";
import Image from "next/image";

export const LoadingAnimation = () => {
  return (
    <div className="loading-animation">
      <Image
        src={logo}
        width="40"
        height="40"
        alt="Loading logo..."
        className="loader-logo"
      />
    </div>
  );
};
