import { Footer as FooterLayout, Logo } from "@notadream/react";

const FooterHeader = () => {
  return (
    <>
      <Logo src="/vite.svg" size="large" alt="Logo" />
      <span className="app-name">Nabin Dhital</span>
    </>
  );
};

const FooterBody = () => {
  return (
    <>
      <span>{"Thanks for scrolling, that's all folks."}</span>
    </>
  );
};

const FooterFooter = () => {
  return (
    <>
      <span>
        Build from <span className="heart-symbol">❤</span>
      </span>
      <span>{`© Copyright ${new Date().getFullYear()} Nabin Dhital. All Rights Reserved.`}</span>
    </>
  );
};

export const Footer = () => {
  return (
    <FooterLayout
      header={<FooterHeader />}
      body={<FooterBody />}
      footer={<FooterFooter />}
    />
  );
};
