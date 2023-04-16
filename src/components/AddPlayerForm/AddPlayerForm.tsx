import { Team } from "@/types/Team";
import React, { useEffect } from "react";
import Button from "../Button/Button";
import CardWrapper from "../CardWrapper/CardWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../Input/Input";
import Select from "../Select/Select";
import FileInput from "../FileInput/FileInput";
import { Camera, Shield } from "react-feather";

const AddPlayerForm = ({ teams }: { teams: Team[] }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data: any) => {
    console.log("hola");
    console.log(data);
  };

  const teamOptions = teams.map(({ id, name }) => {
    return { value: id, label: name };
  });
  return (
    <CardWrapper title="Add Player">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <FileInput
          Placeholder={Camera}
          label="photo"
          register={register("photo")}
        />

        <Button type="submit">Add Game</Button>
      </form>
    </CardWrapper>
  );
};

export default AddPlayerForm;
