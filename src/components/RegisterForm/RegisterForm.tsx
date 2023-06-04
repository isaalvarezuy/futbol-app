import React, { useState } from "react";
import Input from "../Input/Input";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login.schema";
import InputNew from "../InputNew/InputNew";
import { Eye, EyeOff } from "react-feather";

import { useMutation } from "react-query";
import { showNotification } from "@/utils/showNotification";
import { NavLink, useNavigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";
import Paragraph from "../Paragraph/Paragraph";
import { useLogin } from "@/hooks/services/auth/useLogin";
import Link from "../Link/Link";
import FormWrapper from "../FormWrapper/FormWrapper";

const RegisterForm = () => {
  const handleError = ({ response }: any) => {
    showNotification(response.data.error, 500, "error");
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div className="w-full">
      <FormWrapper schema={loginSchema} onSubmit={onSubmit}>
        {({ register, errors }) => {
          return (
            <>
              <Paragraph size={20} weight="semibold">
                Welcome back
              </Paragraph>
              <InputNew
                label="Username"
                type="text"
                error={errors["username"]}
                {...register("username")}
              />

              <Button type="submit">Login</Button>
              <div className="flex gap-2">
                <Paragraph>Dont have an account?</Paragraph>
                <Link to="register">Sign Up</Link>
              </div>
            </>
          );
        }}
      </FormWrapper>
    </div>
  );
};

export default RegisterForm;
