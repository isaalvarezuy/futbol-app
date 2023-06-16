import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import Button from "../Button/Button";
import { registerSchema } from "@/schemas/register.schema";
import InputNew from "../InputNew/InputNew";
import { Eye, EyeOff } from "react-feather";

import { showNotification } from "@/utils/showNotification";

import Paragraph from "../Paragraph/Paragraph";
import Link from "../Link/Link";
import FormWrapper from "../FormWrapper/FormWrapper";
import Select from "../SelectNew/Select";
import { useTeams } from "@/hooks/services/teams/useTeams";
import { useStore } from "@/hooks/useStore";
import { useQuery } from "react-query";

const RegisterForm = () => {
  const { getTeams } = useTeams();
  const updateTeams = useStore((state) => state.updateTeams);

  const handleError = ({ response }: any) => {
    showNotification(response.data.error, 500, "error");
  };

  const { data: teams } = useQuery({
    queryKey: ["get-teams"],
    queryFn: getTeams,
    onSuccess: (data) => {
      updateTeams(data);
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
              {teams && (
                <Select
                  label="Team"
                  {...register("team")}
                  error={errors["password"]}
                  options={[
                    ...teams.map((t) => ({ label: t.name, value: t.id })),
                    { value: "", label: "Create new team" },
                  ]}
                />
              )}

              <Button type="submit">Sign up</Button>
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
