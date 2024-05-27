import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { ZodSchema } from "zod";

interface FormProviderConfigured {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: SubmitHandler<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: ZodSchema<any>;
  children: React.ReactNode;
  defaultValues: object;
}

const FormProviderConfigured: React.FC<FormProviderConfigured> = ({
  onSubmit,
  validationSchema,
  children,
  defaultValues,
}) => {
  const methods = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};
