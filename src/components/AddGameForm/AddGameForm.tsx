import { useFieldArray, useForm } from "react-hook-form";
import Select from "../SelectNew/Select";
import { useQuery } from "react-query";
import { useTeams } from "@/hooks/services/teams/useTeams";
import InputNew from "../InputNew/InputNew";
/* import {Button} from 'ia-moonlight' */
import { useWatch } from "react-hook-form";
import { Button } from "ia-moonlight";
import { useEffect } from "react";

const AddGameForm = () => {
  const { handleSubmit, register, control, setValue } = useForm({});

  const { getTeams } = useTeams();
  const { data: teams } = useQuery({
    queryKey: ["get-teams"],
    queryFn: getTeams,
  });

  const { fields, append } = useFieldArray({
    control,
    name: "goalScorers", // unique name for your Field Array
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const teamGoals = useWatch({ name: "goals1", control });
  const goalScorers = useWatch({ name: "goalScorers", control });
  const totalGoalsByGoalScorer = goalScorers?.reduce(
    (total: number, player: typeof goalScorers[number]) =>
      total + parseInt(player.goals),
    0
  );

  useEffect(() => {
    if (!teamGoals) setValue("goalScorers", []);
  }, [teamGoals]);

  const canAddGoalScorer = totalGoalsByGoalScorer < teamGoals;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {teams && (
          <div className="flex gap-2">
            <Select
              options={teams?.map((team) => ({
                value: team.id,
                label: team.name,
              }))}
              {...register("team1")}
            />
            <InputNew className="w-10" {...register("goals1")} type="number" />
          </div>
        )}
        {fields.map((field, index) => (
          <div className="flex" key={field.id}>
            <InputNew {...register(`goalScorers.${index}.player`)} />
            <InputNew
              type="number"
              {...register(`goalScorers.${index}.goals`)}
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
