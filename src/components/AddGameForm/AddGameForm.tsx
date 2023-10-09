import { useFieldArray, useForm } from "react-hook-form";
import Select from "../SelectNew/Select";
import { useQuery } from "react-query";
import { useTeams } from "@/hooks/services/teams/useTeams";
import InputNew from "../InputNew/InputNew";
/* import {Button} from 'ia-moonlight' */
import { useWatch } from "react-hook-form";
import { Button } from "ia-moonlight";
import { useEffect } from "react";
import { getTeamPlayers } from "@/utils/utils";
import { Team } from "@/types/Team";

const AddGameForm = ({ teams }: { teams: Team[] }) => {
  const { handleSubmit, register, control, setValue } = useForm({
    defaultValues: {
      team: teams[0].id,
      goals: 0,
      goalScorers: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "goalScorers", // unique name for your Field Array
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const team = useWatch({ name: "team", control });
  const teamGoals = useWatch({ name: "goals", control });
  const goalScorers = useWatch({ name: "goalScorers", control });
  const totalGoalsByGoalScorer = goalScorers?.reduce(
    (total: number, player: typeof goalScorers[number]) =>
      total + parseInt(player.goals),
    0
  );

  const teamPlayers = getTeamPlayers(team, teams);
  console.log(teamPlayers);

  console.log(team);
  useEffect(() => {
    if (!teamGoals) setValue("goalScorers", []);
  }, [teamGoals]);

  

  const canAddGoalScorer = totalGoalsByGoalScorer < teamGoals;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {teams && (
          <div className="flex gap-2">
            <Select
              options={teams?.map((team) => ({
                value: team.id,
                label: team.name,
              }))}
              {...register("team")}
            />
            <InputNew className="w-10" {...register("goals")} type="number" />
          </div>
        )}
        {fields.map((field, index) => (
          <div className="flex gap-2 w-full" key={field.id}>
            <Select
              className="w-full"
              options={teamPlayers?.map((player) => ({
                value: player.id,
                label: player.name,
              }))}
          /*     {...register(`goalScorers.${index}.player`)} */
            />
            <InputNew
              className="w-10"
              type="number"
            /*   {...register(`goalScorers.${index}.goals`)} */
            />
          </div>
        ))}
        {teamGoals > 1 && (
          <Button
            variant="secondary"
            onClick={() => {
              append({});
            }}
            disabled={!canAddGoalScorer}
          >
            Add goal scorer
          </Button>
        )}
        <button type="submit">click</button>
      </form>
    </div>
  );
};

export default AddGameForm;
