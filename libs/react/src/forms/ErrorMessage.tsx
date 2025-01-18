interface ErrorMessageProperties {
  errorMessage: React.ReactNode;
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProperties) => {
  return <span className="error-message">{errorMessage}</span>;
};
