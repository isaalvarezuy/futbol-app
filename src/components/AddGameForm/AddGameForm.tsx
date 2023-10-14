import { FormProvider, useForm } from "react-hook-form";
import { Team } from "@/types/Team";
import TeamSection from "./TeamSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { addGameSchema } from "@/schemas/addGame.schema";

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
    resolver: zodResolver(addGameSchema),
    defaultValues: {
      team1: teams[1].id,
      goals1: "0",
      goalScorers1: [],
      team2: teams[2].id,
      goals2: "0",
      goalScorers2: [],
    },
  });

  console.log(methods.formState.errors);

  /*   teamOneId: data.team1.value,
      teamOneGoals: Number(data.team1GoalAmount),
      teamOneGoalScorers: formatGoalScorers(data.team1GoalScorers),
      teamTwoId: data.team2.value,
      teamTwoGoals: Number(data.team2GoalAmount),
      teamTwoGoalScorers: formatGoalScorers(data.team2GoalScorers), */

  /*  player: p.player.value,
        amount: Number(p.amount), */

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
