import { Team } from "@/types/Team";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import CardWrapper from "../CardWrapper/CardWrapper";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { ref } from "yup";
import { Player } from "@/types/responses/Player";
import { getTeamPlayers, transformToSelectOption } from "@/utils/utils";
import { SelectOption } from "@/types/components/SelectOption";
import { Plus, Trash2 } from "react-feather";

const AddGameForm = ({
  teams,
  players,
}: {
  teams: Team[];
  players: Player[];
}) => {
  const schema = yup.object({
    /*  team1Goals: yup.number().required(),
    team1: yup.string().required(),
    team2: yup
      .string()
      .required()
      .notOneOf([ref("team1")], "Both teams must be different"), */
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      team1GoalAmount: "0",
      team1GoalScorers: [{ playerId: "", amount: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "team1GoalScorers",
    control,
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const [team1Goals, setTeam1Goals] = useState("0");
  const [team1Players, setTeam1Players] = useState<SelectOption[]>([]);

  const watchTeam1 = watch("team1");
  const watchTeam1GoalAmount = watch("team1GoalAmount");

  useEffect(() => {
    const team1Players = getTeamPlayers(players, watchTeam1);
    setTeam1Players(transformToSelectOption(team1Players));
  }, [watchTeam1, players]);

  useEffect(() => {
    setTeam1Goals(watchTeam1GoalAmount);
  }, [watchTeam1GoalAmount]);

  const teamOptions = teams.map(({ id, name }) => {
    return { value: id, label: name };
  });
  return (
    <CardWrapper title="Add Game">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <>
          <div className="flex w-full gap-2 text-sm font-body">
            <Controller
              name="team1"
              control={control}
              render={({ field }) => (
                <Select options={teamOptions} {...field} />
              )}
            />

            <div className="w-[60px]">
              <Controller
                name={"team1GoalAmount"}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    register={register}
                    errors={errors}
                    type="number"
                  />
                )}
              />
            </div>
          </div>
          {fields.map((field, index) => {
            if (parseInt(team1Goals) > 0)
              return (
                <div className="flex w-full gap-2 text-sm font-body">
                  <Controller
                    key={field.id}
                    name={`team1GoalScorers[${index}].playerId`}
                    control={control}
                    render={({ field }) => (
                      <Select options={team1Players} {...field} />
                    )}
                  />
                  <div className="w-[60px]">
                    <Controller
                      key={field.id}
                      name={`team1GoalScorers[${index}].amount`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          register={register}
                          errors={errors}
                          type="number"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30px] flex items-center">
                    <button onClick={() => remove(index)}>
                      <Trash2 className="h-4 text-red-600 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              );
          })}
          {parseInt(team1Goals) > 0 && (
            <Button
              variant="secondary"
              onClick={() => {
                append({
                  playerId: team1Players[0].value,
                  amount: 1,
                });
              }}
            >
              <>
                <Plus className="h-4" />
                Add player
              </>
            </Button>
            /*  <button
              type="button"
              
            >
              Append
            </button> */
          )}

          <span className="text-xs text-center font-body">vs.</span>
          <div className="flex w-full gap-2 text-sm font-body">
            <div className="w-full">
              <Controller
                name="team2"
                control={control}
                render={({ field }) => (
                  <Select options={teamOptions} {...field} />
                )}
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
        </>
      </form>
    </CardWrapper>
  );
};

export default AddGameForm;
