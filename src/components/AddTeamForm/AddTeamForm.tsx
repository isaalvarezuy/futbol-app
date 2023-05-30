import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import CardWrapper from "../CardWrapper/CardWrapper";
import Input from "../Input/Input";
import { Shield } from "react-feather";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import { useMutation, useQueryClient } from "react-query";
import FileInput from "../FileInput/FileInput";
import { showNotification } from "@/utils/showNotification";
import { teamSchema } from "@/schemas/team.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Paragraph from "../Paragraph/Paragraph";
import { useTeams } from "@/hooks/services/teams/useTeams";

const AddTeamForm = () => {
  const { addTeam } = useTeams();
  const handleFormSuccess = () => {
    reset();
    queryClient.invalidateQueries("get-teams");
    showNotification("Team added correctly", 2000, "success");
  };
  const { mutate, isLoading, isSuccess, isError } = useMutation(addTeam, {
    onSuccess: handleFormSuccess,
  });
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(teamSchema),
  });

  const hasErrors = Object.keys(errors).length > 0;
  const firstError = Object.keys(errors)[0];

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("crest", data.crest[0]);
    formData.append("name", data.name);
    mutate(formData);
  };

  return (
    <CardWrapper title="Add Team">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <FileInput
          Placeholder={Shield}
          label="crest"
          register={register("crest")}
          watcher={watch("crest")}
        />
        <FieldWrapper label="Team Name">
          <Input errors={errors} type="text" {...register(`name`)} />
        </FieldWrapper>
        {hasErrors && (
          <Paragraph color="text-red-600">
            {errors[firstError]?.message as string}
          </Paragraph>
        )}
        <Button variant="primary" type="submit" loading={isLoading}>
          Add team
        </Button>
      </form>
    </CardWrapper>
  );
};

export default AddTeamForm;
