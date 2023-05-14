import React from "react";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login.schema";

const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(loginSchema) });

  console.log(errors);
  return (
    <div className="flex flex-col gap-4 p-4">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Input errors={errors} name={"email"} />
        <Input errors={errors} name={"password"} type="password" />
        <Button type="submit">click</Button>
      </form>
    </div>
  );
};

export default LoginForm;
