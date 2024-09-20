export interface FooterProperties {
  children: React.ReactNode;
}

export const Footer = ({ children }: FooterProperties) => {
  return <footer>{children}</footer>;
};
