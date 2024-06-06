import { getGeneratedClassName } from "../ThemeEngine";

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
