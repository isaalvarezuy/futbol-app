import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
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
  isSuccess?: boolean;
  children: (methods: {
    errors: FieldErrors<FieldValues>;
    register: UseFormRegister<FieldValues>;
  }) => React.ReactNode;
};

const FormWrapper = ({ schema, onSubmit, isSuccess, children }: FormProps) => {
  const methods = useForm();

  type ValidationSchema = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);
  
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2 p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {children({ register, errors })}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
