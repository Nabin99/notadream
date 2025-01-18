import { ErrorMessage } from "../../forms/ErrorMessage";

export type TextAreaInputProperties = React.HTMLProps<HTMLTextAreaElement> & {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "outlined" | "filled";
  fieldSize?: "small" | "medium" | "large";
  error?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
  name: string;
};

export const TextAreaInput: React.FC<TextAreaInputProperties> = ({
  label,
  placeholder = "Enter text",
  value,
  defaultValue,
  onChange,
  resize = "none",
  variant = "default",
  fieldSize = "medium",
  error,
  disabled = false,
  iconLeft,
  iconRight,
  className = "",
  name,
  ...properties
}) => {
  const handleChange = (error: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!disabled && onChange) {
      onChange(error.target.value);
    }
  };

  return (
    <div
      className={`text-input ${variant} ${fieldSize} ${disabled ? "disabled" : ""} ${error ? "error" : ""} ${className}`.trimEnd()}
    >
      {label && (
        <label htmlFor="" className="text-input-label">
          {label}
        </label>
      )}
      <div className="text-input-wrapper">
        {iconLeft && <span className="icon-left">{iconLeft}</span>}
        <textarea
          style={{ resize }}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          className="text-input-field"
          name={name}
          {...properties}
        />
        {iconRight && <span className="icon-right">{iconRight}</span>}
      </div>
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
};
