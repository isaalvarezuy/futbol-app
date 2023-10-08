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
  const { handleSubmit, register, control, setValue } = useForm();

  const { getTeams } = useTeams();
  const { data: teams } = useQuery({
    queryKey: ["get-teams"],
    queryFn: getTeams,
  });

  const { fields, append } = useFieldArray({
    control,
    name: "test", // unique name for your Field Array
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const teamGoals = useWatch({ name: "goals1", control });
  const teamGoalScorers = useWatch({ name: "test", control });

  useEffect(() => {
    if (!teamGoals) setValue("test", []);
  }, [teamGoals]);

  console.log(teamGoals);
  console.log(teamGoalScorers);

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
          <InputNew key={field.id} {...register(`test.${index}.value`)} />
        ))}
        {teamGoals > 1 && (
          <Button
            variant="secondary"
            onClick={() => {
              append({ test: "test" });
            }}
            disabled={teamGoalScorers?.length >= teamGoals}
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
