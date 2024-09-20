import { Spinner } from "./Spinner";
import { ButtonProperties } from "./type";

export const Button: React.FC<ButtonProperties> = ({
  children,
  icon,
  iconOnly = false,
  loading = false,
  onClick,
  size = "medium",
  variant = "solid",
  disabled = false,
  type = "button",
  className = "",
  isFullWidth = false,
}) => {
  const isDisabled = disabled || loading;
  const buttonClasses = [
    "btn",
    `btn-${size}`,
    `btn-${variant}`,
    isDisabled ? "btn-disabled" : "",
    isFullWidth ? "btn-full-width" : "",
    iconOnly ? "btn-icon-only" : "",
    className,
  ].join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled || loading}
    >
      {loading ? (
        <Spinner size={size} />
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {!iconOnly && children}
        </>
      )}
    </button>
  );
};
