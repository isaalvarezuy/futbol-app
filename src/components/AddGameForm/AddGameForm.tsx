import { FormProvider, useForm } from "react-hook-form";
import { Team } from "@/types/Team";
import TeamSection from "./TeamSection";

type TeamType = {
  team: string;
  goals: number;
  goalScorers: {
    player: string;
    goals: string;
  }[];
};

const AddGameForm = ({ teams }: { teams: Team[] }) => {
  const methods = useForm({
    defaultValues: {
      team1: teams[1].id,
      goals1: 0,
      goalScorers1: [],
      team2: teams[2].id,
      goals2: 0,
      goalScorers2: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TeamSection teams={teams} id={1} />
          <TeamSection teams={teams} id={2} />
          <button type="submit">submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddGameForm;
