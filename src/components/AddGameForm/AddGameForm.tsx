import { Team } from "@/types/Team";
import React, { useEffect } from "react";
import Button from "../Button/Button";
import CardWrapper from "../CardWrapper/CardWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../Input/Input";
import Select from "../Select/Select";

const AddGameForm = ({ teams }: { teams: Team[] }) => {
  const schema = yup
    .object({
      team1Goals: yup.number().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data: any) => {
    console.log(data);
  };


  const teamOptions = teams.map(({ id, name }) => {
    return { value: id, label: name };
  });
  return (
    <CardWrapper title="Add Game">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <div className="flex w-full gap-2 text-sm font-body">
          <div className="w-full">
            <Select
              control={control}
              options={teamOptions}
              register={register}
              name={"team1"}
              errors={errors}
            />
          </div>
          <div className="w-[60px]">
            <Input
              register={register}
              name="team1Goals"
              defaultValue={0}
              errors={errors}
            />
          </div>
        </div>
        <span className="text-xs text-center font-body">vs.</span>
        <div className="flex w-full gap-2 text-sm font-body">
          <div className="w-full">
            <Select
              control={control}
              options={teamOptions}
              register={register}
              name={"team2"}
              errors={errors}
            />
          </div>
          <div className="w-[60px]">
            <Input
              register={register}
              name="team2Goals"
              defaultValue={0}
              errors={errors}
            />
          </div>
        </div>
        <Button type="submit">Add Game</Button>
      </form>
    </CardWrapper>
  );
};

export default AddGameForm;
