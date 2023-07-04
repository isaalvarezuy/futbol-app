import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import {
  FieldErrors,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormRegister,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type FormProps = {
  schema: z.ZodObject<any> | any;
  onSubmit: SubmitHandler<FieldValues>;
  isSuccess?: boolean;
  children: (methods: {
    errors: FieldErrors<FieldValues>;
    register: UseFormRegister<FieldValues>;
    watch: UseFormWatch<{
      [x: string]: any;
    }>;
  }) => React.ReactNode;
};

const FormWrapper = ({ schema, onSubmit, isSuccess, children }: FormProps) => {
  const methods = useForm();

  type ValidationSchema = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    reset,
    watch,
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
        {children({ register, errors, watch })}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
