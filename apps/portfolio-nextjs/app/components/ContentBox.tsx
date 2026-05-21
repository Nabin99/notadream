export const ContentBox: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...properties
}) => {
  return (
    <div {...properties} className={`content-box ${className}`.trimEnd()}>
      {children}
    </div>
  );
};
