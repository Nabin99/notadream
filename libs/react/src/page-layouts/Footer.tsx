export interface FooterProperties {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

export const Footer = ({ header, body, footer }: FooterProperties) => {
  return (
    <footer>
      {header && <div className="footer-header"> {header}</div>}
      {body && <div className="footer-body">{body} </div>}
      {footer && <div className="footer-footer">{footer} </div>}
    </footer>
  );
};
