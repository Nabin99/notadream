import { ErrorMessage } from "../../forms";

export type TextInputProperties = Omit<
  React.HTMLProps<HTMLInputElement>,
  "onChange"
> & {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  variant?: "default" | "outlined" | "filled";
  fieldSize?: "small" | "medium" | "large";
  error?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  name: string;
};

export const TextInput: React.FC<TextInputProperties> = ({
  label,
  placeholder = "Enter text",
  value,
  defaultValue,
  onChange,
  type = "text",
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
  const handleChange = (event_: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event_);
    }
  };

  return (
    <div
      className={`text-input ${variant} ${fieldSize} ${disabled ? "disabled" : ""} ${error ? "error" : ""} ${className}`.trimEnd()}
    >
      {label && <label className="text-input-label">{label}</label>}
      <div className="text-input-wrapper">
        {iconLeft && <span className="icon-left">{iconLeft}</span>}
        <input
          type={type}
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
