import { getAppConfig } from "@notadream/react";
import { BrowserLink } from "@notadream/react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

export const SocialLinks = () => {
  const appConfig = getAppConfig();

  const socialLinkList = [
    {
      href: appConfig.socialLinks.linkedin,
      icon: <FaLinkedin />,
    },
    {
      href: appConfig.socialLinks.github,
      icon: <FaGithubSquare />,
    },
    {
      href: appConfig.socialLinks.instagram,
      icon: <FaSquareInstagram />,
    },
    {
      href: appConfig.socialLinks.facebook,
      icon: <FaFacebookSquare />,
    },
    {
      href: appConfig.socialLinks.twitter,
      icon: <FaSquareXTwitter />,
    },
  ];

  return (
    <div className="social-links">
      {socialLinkList.map((link, i) => (
        <BrowserLink
          key={i}
          href={link.href}
          referrerPolicy="no-referrer"
          target="_blank"
          iconLeft={link.icon}
          iconOnly
          size="large"
          variant="borderless"
        />
      ))}
    </div>
  );
};
