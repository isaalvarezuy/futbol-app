import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";

type FormProps = {
  schema: any;
  onSubmit: SubmitHandler<FieldValues>;
  children: (methods: {
    errors: FieldErrors<FieldValues>;
    register: UseFormRegister<FieldValues>;
  }) => React.ReactNode;
};

const FormWrapper = ({ schema, onSubmit, children }: FormProps) => {
  const methods = useForm();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {children({ register, errors })}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
