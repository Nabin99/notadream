import stylex from "@stylexjs/stylex";

const headerStyles = stylex.create({
  base: {
    gridArea: "header",
    width: "100%",
    minHeight: "10rem",
    border: "1px solid black",
  },
});

export const Header = () => {
  return <div {...stylex.props(headerStyles.base)}>Header</div>;
};
