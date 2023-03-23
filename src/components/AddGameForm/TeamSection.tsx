import { SelectOption } from "@/types/components/SelectOption";
import { Player } from "@/types/responses/Player";
import { Team } from "@/types/Team";
import { getTeamPlayers, transformToSelectOption } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "react-feather";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";

interface Props {
  label: string;
  teams: Team[];
  players: Player[];
}

const TeamSection = ({ label, teams, players }: Props) => {
  const {
    control,
    watch,
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `${label}GoalScorers`,
    control,
  });

  const [teamGoals, setTeamGoals] = useState(getValues(`${label}GoalAmount`));
  const [teamPlayers, setTeamPlayers] = useState<SelectOption[]>([]);

  console.log();
  const teamOptions = transformToSelectOption(teams);

  const watchTeam = watch(`${label}`);
  const watchTeamGoals = watch(`${label}GoalAmount`);

  useEffect(() => {
    setTeamGoals(watchTeamGoals);
  }, [watchTeamGoals]);

  useEffect(() => {
    setTeamPlayers(
      transformToSelectOption(getTeamPlayers(players, watchTeam.value))
    );
  }, [watchTeam, players]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-2 text-sm font-body">
        <Select
          options={teamOptions}
          control={control}
          name={`${label}`}
          errors={errors}
        />

        <div className="w-[60px]">
          <Input
            errors={errors}
            type="number"
            {...register(`${label}GoalAmount`)}
          />
        </div>
      </div>
      {fields.map((field, index) => {
        const prefix = `${label}GoalScorers[${index}]`;
        if (parseInt(teamGoals) > 0)
          return (
            <div key={field.id} className="flex w-full gap-2 text-sm font-body">
              <Select
                options={teamPlayers}
                control={control}
                name={`${prefix}.player`}
                errors={errors}
              />

               <div className="w-[60px]">
                <Controller
                  name={`${prefix}.amount`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      errors={errors}
                      type="number"
                      {...field}
                      ref={null}
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
      {parseInt(teamGoals) > 0 && (
        <Button
          variant="secondary"
          onClick={() => {
            append({
              player: teamPlayers[0],
              amount: "1",
            });
          }}
        >
          <>
            <Plus className="h-4" />
            Add player
          </>
        </Button>
      )}
    </div>
  );
};

export default TeamSection;
