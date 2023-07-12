import { SelectOption } from "@/types/components/SelectOption";
import { Player } from "@/types/responses/Player";
import { Team } from "@/types/models/Team";
import { getTeamPlayers, transformToSelectOption } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "react-feather";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { FieldValues } from "react-hook-form";

interface Props {
  label: string;
  teams: Team[];
}

const TeamSection = ({ label, teams }: Props) => {
  const {
    control,
    watch,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `${label}GoalScorers`,
    control,
  });

  const watchGoalScorers = useWatch({
    control,
    name: `${label}GoalScorers`,
    defaultValue: [],
  });

  const [teamGoals, setTeamGoals] = useState(getValues(`${label}GoalAmount`));
  const [teamPlayers, setTeamPlayers] = useState<SelectOption[]>([]);
  const [canAddGoalScorer, setCanAddGoalScorer] = useState(true);
  const teamOptions = transformToSelectOption(teams);

  const watchTeam = watch(`${label}`);
  const watchTeamGoals = watch(`${label}GoalAmount`);

  useEffect(() => {
    setTeamGoals(watchTeamGoals);
  }, [watchTeamGoals]);

  const toggleAddGoalscorerButton = (
    totalGoalsPerPlayers: number,
    watchTeamGoals: string
  ) => {
    if (totalGoalsPerPlayers >= parseInt(watchTeamGoals)) {
      setCanAddGoalScorer(false);
    } else {
      setCanAddGoalScorer(true);
    }
  };

  useEffect(() => {
    const totalGoalsPerPlayers = watchGoalScorers.reduce(
      (acc: number, curr: { player: SelectOption; amount: string }) => {
        return acc + parseInt(curr.amount);
      },
      0
    );
    toggleAddGoalscorerButton(totalGoalsPerPlayers, watchTeamGoals);
  }, [watchGoalScorers, watchTeamGoals]);

  useEffect(() => {
    setTeamPlayers(
      transformToSelectOption(getTeamPlayers(watchTeam.value, teams))
    );
    setValue(`${label}GoalScorers`, []);
  }, [watchTeam, teams]);

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
                  render={({ field }: { field: FieldValues }) => (
                    <Input
                      errors={errors}
                      type="number"
                      {...register(`${prefix}.amount`)}
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
          disabled={!canAddGoalScorer}
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
            Add goal scorer
          </>
        </Button>
      )}
    </div>
  );
};

export default TeamSection;
