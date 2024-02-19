import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    width: "100%",
    maxWidth: 800,
    minHeight: 40,
  },
  child: {
    backgroundColor: "black",
    marginBlock: "1rem",
  },
});

const colorStyles = stylex.create({
  red: {
    backgroundColor: "red",
    borderColor: "darkred",
  },
  green: {
    backgroundColor: "lightgreen",
    borderColor: "darkgreen",
  },
});

export const TestComponent = () => {
  return (
    <div {...stylex.props(styles.root, colorStyles.red)}>
      Wonderful to see it work
    </div>
  );
};
