export interface BadgeProperties {
  label: React.ReactNode;
  className?: string;
}

export interface PageProperties {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badges?: BadgeProperties[];
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export interface ErrorPageProperties extends PageProperties {
  errorMessage?: React.ReactNode;
  buttonLabel?: React.ReactNode;
}
