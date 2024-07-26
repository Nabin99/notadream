import { getGeneratedClassName } from "../theme-engine";

interface ErrorMessageProperties {
  errorMessage: React.ReactNode;
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProperties) => {
  return (
    <span className={getGeneratedClassName()?.forms.errorMessage}>
      {errorMessage}
    </span>
  );
};
