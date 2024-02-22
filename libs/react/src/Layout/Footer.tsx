import stylex from "@stylexjs/stylex";

const footerStyles = stylex.create({
  base: {
    gridArea: "footer",
    width: "100%",
    minHeight: "10rem",
    border: "1px solid black",
  },
});
export const Footer = () => {
  return <div {...stylex.props(footerStyles.base)}>Footer</div>;
};
