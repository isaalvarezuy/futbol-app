import { Team } from "@/types/Team";
import Select from "@/components/SelectNew/Select";
import InputNew from "@/components/InputNew/InputNew";
import { Plus, Trash2 } from "react-feather";
import { Button } from "ia-moonlight";
import IconWrapper from "@/components/IconWrapper/IconWrapper";
import { getTeamPlayers } from "@/utils/utils";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

interface Props {
  teams: Team[];
  id: number;
}

const TeamSection = ({ teams, id }: Props) => {
  const [goalScorerField, goalsField, teamField] = [
    `goalScorers${id}`,
    `goals${id}`,
    `team${id}`,
  ];
  const { register, control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: goalScorerField,
  });

  const teamGoals = useWatch({ name: goalsField });
  const team = useWatch({ name: teamField });
  const [teamPlayers, setTeamPlayers] = useState(getTeamPlayers(team, teams));

  useEffect(() => {
    setTeamPlayers(getTeamPlayers(team, teams));
    setValue(goalScorerField, []);
  }, [team]);

  const goalScorers = useWatch({ name: goalScorerField });
  const totalGoalsByGoalScorer = goalScorers?.reduce(
    (total: number, player: typeof goalScorers[number]) =>
      total + parseInt(player.goals),
    0
  );
  const canAddGoalScorer =
    !totalGoalsByGoalScorer || totalGoalsByGoalScorer < teamGoals;

  return (
    <div>
      {teams && (
        <div className="flex gap-2">
          <Select
            options={teams.map((team) => ({
              value: team.id,
              label: team.name,
            }))}
            {...register(teamField)}
          />
          <InputNew
            containerClassName="w-16"
            {...register(goalsField)}
            type="number"
          />
        </div>
      )}

      {fields.map((field, index) => (
        <div className="flex gap-2 w-full items-center" key={field.id}>
          <Select
            options={teamPlayers?.map((player) => ({
              value: player.id,
              label: player.name,
            }))}
            {...register(`${goalScorerField}.${index}.player`)}
          />
          <InputNew
            containerClassName="w-16"
            type="number"
            {...register(`${goalScorerField}.${index}.goals`)}
          />
          <button onClick={() => remove(index)}>
            <Trash2 className="h-4 text-red-600 hover:text-red-400" />
          </button>
        </div>
      ))}
      {teamGoals > 0 && (
        <Button
          variant="secondary"
          onClick={() => {
            append({
              player: teamPlayers?.[0]?.id || "",
              goals: "0",
            });
          }}
          className="w-full mt-2"
          disabled={!canAddGoalScorer}
        >
          <IconWrapper size={16}>
            <Plus />
          </IconWrapper>
          Add goal scorer
        </Button>
      )}
    </div>
  );
};

export default TeamSection;
