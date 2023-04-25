import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import CardWrapper from "../CardWrapper/CardWrapper";
import Input from "../Input/Input";
import { Shield } from "react-feather";
import axios from "axios";
import InputWrapper from "../InputWrapper/InputWrapper";
import { addTeam } from "@/services/teams/teams";
import { useMutation, useQueryClient } from "react-query";
import FileInput from "../FileInput/FileInput";
import { showNotification } from "@/utils/showNotification";
import { teamSchema } from "@/schemas/team.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Paragraph from "../Paragraph/Paragraph";

const AddTeamForm = () => {
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
    console.log(data);

    const formData = new FormData();
    formData.append("crest", data.crest[0]);
    formData.append("name", data.name);
    mutate(formData);
  };

  console.log(errors);

  return (
    <CardWrapper title="Add Team">
      {isLoading && "loading"}
      {isSuccess && "added ok"}
      {isError && "error"}
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
        <InputWrapper label="Team Name">
          <Input errors={errors} type="text" {...register(`name`)} />
        </InputWrapper>
        {hasErrors && (
          <Paragraph color="text-red-600">
            {errors[firstError]?.message as string}
          </Paragraph>
        )}
        <Button variant="primary" type="submit">
          Add team
        </Button>
      </form>
    </CardWrapper>
  );
};

export default AddTeamForm;
