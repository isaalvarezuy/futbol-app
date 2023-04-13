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

const AddTeamForm = () => {
  const handleFormSuccess = () => {
    reset();
    queryClient.invalidateQueries("get-teams");
  };
  const { mutate, isLoading, isSuccess, isError } = useMutation(addTeam, {
    onSuccess: handleFormSuccess,
  });
  const queryClient = useQueryClient();
  const { register, formState: errors, handleSubmit, watch, reset } = useForm();

  const fileWatcher = watch("crest");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (fileWatcher && fileWatcher[0]) {
      setPreview(URL.createObjectURL(fileWatcher[0]));
    }
  }, [fileWatcher]);

  const onSubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("crest", data.crest[0]);
    formData.append("name", data.name);
    mutate(formData);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadCrest = () => {
    inputRef!.current!.click();
  };

  return (
    <CardWrapper title="Add Team">
      {isLoading && "loading"}
      {isSuccess && "added ok"}
      {isError && "error"}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
            {!preview ? (
              <Shield className="h-6 w-6 text-gray-400" />
            ) : (
              <img src={preview} className="h-7" />
            )}
          </div>
          <Button variant="secondary" onClick={handleUploadCrest}>
            Upload crest
          </Button>
        </div>
        <input
          type="file"
          {...register(`crest`)}
          ref={(e) => {
            const { ref } = { ...register("crest") };
            ref(e);
            inputRef.current = e;
          }}
          multiple={false}
          hidden
        />
        <InputWrapper label="Team Name">
          <Input errors={errors} type="text" {...register(`name`)} />
        </InputWrapper>
        <Button variant="primary" type="submit">
          Add team
        </Button>
      </form>
    </CardWrapper>
  );
};

export default AddTeamForm;
