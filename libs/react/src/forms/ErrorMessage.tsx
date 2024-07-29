interface ErrorMessageProperties {
  errorMessage: React.ReactNode;
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProperties) => {
  return <span>{errorMessage}</span>;
};
