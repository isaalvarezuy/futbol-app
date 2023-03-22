import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex flex-col gap-2">
      Name
      <Input
        type="text"
        register={register}
        name={"username"}
        errors={errors}
      />
      Password
      <Input
        type="password"
        register={register}
        name={"password"}
        errors={errors}
      />
      Team

    </div>
  );
};

export default RegisterForm;
