import { BrowserLink } from "@notadream/react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

const socialLinkList = [
  {
    href: "https://www.linkedin.com/in/nabin-dhital-a8ba64234",
    icon: <FaLinkedin />,
  },
  {
    href: "https://github.com/Nabin99",
    icon: <FaGithubSquare />,
  },
  {
    href: "https://www.instagram.com/dhitalnabin11/",
    icon: <FaSquareInstagram />,
  },
  {
    href: "https://www.facebook.com/nabin.dhital.56",
    icon: <FaFacebookSquare />,
  },
  {
    href: "https://twitter.com/dhitalnabin111?t=5TKgyPYJKs45rsoRdjwpIA&s=09",
    icon: <FaSquareXTwitter />,
  },
];

export default function SocialLinks() {
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
}
