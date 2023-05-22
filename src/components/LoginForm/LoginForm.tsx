import React, { useState } from "react";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login.schema";
import InputNew from "../InputNew/InputNew";
import { Eye, EyeOff } from "react-feather";
import { login } from "@/services/auth/login";
import { useMutation } from "react-query";
import { showNotification } from "@/utils/showNotification";
import { useNavigate } from "react-router-dom";

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

  const handleError = ({ response }: any) => {
    showNotification(response.data.error, 500, "error");
  };

  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate(`/dashboard`);
  };

  const { mutate, isLoading } = useMutation(login, {
    onError: handleError,
    onSuccess: goToDashboard,
  });

  console.log(errors);

  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <div>
      <form
        className="flex flex-col gap-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputNew
          label="Username"
          type="text"
          error={errors["username"]}
          {...register("username")}
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

        <Button loading={isLoading} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
