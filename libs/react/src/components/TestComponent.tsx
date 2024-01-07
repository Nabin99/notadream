import { getConfig } from "..";

const TestComponent = () => {
  const { appTitle } = getConfig();

  return <div>{appTitle}</div>;
};

export default TestComponent;
