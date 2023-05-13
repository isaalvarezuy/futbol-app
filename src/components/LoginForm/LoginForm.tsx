import React from "react";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";

const LoginForm = () => {
  const {
    formState: { errors },
  } = useForm();

  return (
    <div className="flex flex-col gap-4 p-4">
      <Input errors={errors} name={"hola"} />
      <Input errors={errors} name={"pass"} type="password" />
      <Button>click</Button>
    </div>
  );
};

export default LoginForm;
