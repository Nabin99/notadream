import { Spinner } from "./Spinner";
import { ButtonProperties } from "./type";

export const Button: React.FC<ButtonProperties> = ({
  icon,
  iconOnly = false,
  loading = false,
  onClick,
  size = "small",
  variant = "solid",
  disabled = false,
  type = "button",
  className = "",
  isFullWidth = false,
  iconPosition = "left",
  label,
  color = "default",
}) => {
  const isDisabled = disabled || loading;
  const buttonClasses = [
    "btn",
    `btn-${size}`,
    `btn-${variant}`,
    `btn-${color}`,
    isDisabled ? "btn-disabled" : "",
    isFullWidth ? "btn-full-width" : "",
    iconOnly ? "btn-icon-only" : "",
    className,
  ].join(" ");

  const renderIcon = () =>
    icon && <span className={`btn-icon ${iconPosition}`}>{icon}</span>;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled || loading}
    >
      {loading && <Spinner size={size} />}

      <>
        {icon && iconPosition === "left" && renderIcon()}
        {label && !iconOnly && <span className="btn-label">{label}</span>}
        {icon && iconPosition === "right" && renderIcon()}
      </>
    </button>
  );
};
