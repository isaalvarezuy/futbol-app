import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormRegister,
  useForm,
  useWatch,
} from "react-hook-form";
import { z } from "zod";

type FormProps = {
  schema: z.ZodObject<any>;
  onSubmit: SubmitHandler<FieldValues>;
  children: (methods: {
    errors: FieldErrors<FieldValues>;
    register: UseFormRegister<FieldValues>;
    watch: any;
  }) => React.ReactNode;
};

const FormWrapper = ({ schema, onSubmit, children }: FormProps) => {
  const methods = useForm();

  type ValidationSchema = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(schema) });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {children({ register, errors, watch })}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
