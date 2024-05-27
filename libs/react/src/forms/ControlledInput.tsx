import {
  useFormContext,
  Controller,
  ControllerRenderProps,
  ControllerFieldState,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface ControlledInputProperties {
  name: string;
  label: string;
  defaultValue?: string;
  renderField: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState?: UseFormStateReturn<FieldValues>;
  }) => React.ReactNode;
}

const ControlledInput = ({
  name,
  defaultValue = "",
  renderField,
}: ControlledInputProperties) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState, formState }) => (
        <>
          {renderField({ field, fieldState, formState })}

          {fieldState.error && (
            <ErrorMessage errorMessage={fieldState.error.message} />
          )}
        </>
      )}
    />
  );
};

export default ControlledInput;
