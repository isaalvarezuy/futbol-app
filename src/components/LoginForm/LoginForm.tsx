import React, { useState } from "react";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login.schema";
import InputNew from "../InputNew/InputNew";
import { Eye, EyeOff } from "react-feather";

import { useMutation } from "react-query";
import { showNotification } from "@/utils/showNotification";
import { NavLink, useNavigate } from "react-router-dom";
import { useSession } from "@/hooks/store/useSession";
import Paragraph from "../Paragraph/Paragraph";
import { useLogin } from "@/hooks/services/auth/useLogin";
import Link from "../Link/Link";

const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { login } = useLogin();

  const [updateToken, updateUser] = useSession((state) => [
    state.updateToken,
    state.updateUser,
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleError = ({ response }: any) => {
    showNotification(response.data.error, 500, "error");
  };

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(login, {
    onError: handleError,
    onSuccess: (data) => {
      console.log(data);
      updateToken(data.data.token);
      const {
        data: { teamId, username, id },
      } = data;
      updateUser(id, username, teamId);
      navigate(`/`);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-2 p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Paragraph size={20} weight="semibold">
          Welcome back
        </Paragraph>
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
        <div className="flex gap-2">
          <Paragraph>Dont have an account?</Paragraph>
          <Link to="register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
