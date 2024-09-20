export interface ListboxOptionType {
  id: string | number;
  [key: string]: string | number | React.ReactNode;
}

export interface ListboxProperties {
  data: ListboxOptionType[];
  selected: ListboxOptionType;
  setSelected: (value: ListboxOptionType) => void;
  renderKey?: string | number;
  buttonIcon?: React.ReactNode; // Allow users to pass custom icons
  placeholder?: string;
}

export type SizesType = "xsmall" | "small" | "medium" | "large";
export type ButtonVariant = "solid" | "outline" | "borderless";
export type ButtonType = "button" | "submit" | "reset";

export interface ButtonProperties
  extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode; // Icon support
  iconOnly?: boolean; // For icon-only mode
  loading?: boolean; // Loading state support
  onClick?: () => void;
  size?: SizesType;
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: ButtonType;
  className?: string; // To allow additional custom styles
  isFullWidth?: boolean;
}

export interface SpinnerProperties {
  size?: SizesType;
  color?: string; // Option to customize the color
  thickness?: string; // Option to customize the thickness of the spinner
  className?: string; // For additional custom styles
}

export interface LogoProperties {
  src: string; // Logo image source
  alt?: string; // Alt text for accessibility
  size?: SizesType; // Size of the logo
  className?: string; // Additional custom classes
}
