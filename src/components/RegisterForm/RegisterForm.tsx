import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import Button from "../Button/Button";
import { registerSchema } from "@/schemas/register.schema";
import InputNew from "../InputNew/InputNew";
import { Eye, EyeOff } from "react-feather";

import { showNotification } from "@/utils/showNotification";

import Paragraph from "../Paragraph/Paragraph";
import Link from "../Link/Link";
import FormWrapper from "../FormWrapper/FormWrapper";
import { useRegister } from "@/hooks/services/auth/useRegister";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const handleError = ({ response }: any) => {
    showNotification(response.data.error, 500, "error");
  };

  const { register } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const navigate = useNavigate();
  const handleFormSuccess = () => {
    navigate(`/dashboard`);
  };

  const { mutate, isLoading } = useMutation(register, {
    onSuccess: handleFormSuccess,
  });
  const onSubmit = (data: FieldValues) => {
    mutate(data);
  };

  return (
    <div className="w-full">
      <FormWrapper schema={registerSchema} onSubmit={onSubmit}>
        {({ register, errors }) => {
          return (
            <>
              <Paragraph size={20} weight="semibold">
                Create your account
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
                error={errors["password"]}
                {...register("password")}
                iconRight={
                  !showPassword ? (
                    <Eye onClick={toggleShowPassword} />
                  ) : (
                    <EyeOff onClick={toggleShowPassword} />
                  )
                }
              />

              <Button type="submit" loading={isLoading}>
                Sign up
              </Button>
              <div className="flex gap-2">
                <Paragraph>Already have an account?</Paragraph>
                <Link to="/">Log In</Link>
              </div>
            </>
          );
        }}
      </FormWrapper>
    </div>
  );
};

export default RegisterForm;
