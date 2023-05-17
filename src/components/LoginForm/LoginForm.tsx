import React, { useState } from "react";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login.schema";
import InputNew from "../InputNew/InputNew";
import { Eye, EyeOff } from "react-feather";

const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  console.log(errors);
  return (
    <div className="flex flex-col gap-4 p-4">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <InputNew
          label="Email"
          type="text"
          error={errors["email"]}
          {...register("email")}
        />
        <InputNew
          label="Password"
          type={showPassword ? "text" : "password"}
          iconRight={
            !showPassword ? (
              <Eye onClick={toggleShowPassword} />
            ) : (
              <EyeOff onClick={toggleShowPassword} />
            )
          }
          error={errors["password"]}
          {...register("password")}
        />

        <Button type="submit">click</Button>
      </form>
    </div>
  );
};

export default LoginForm;
