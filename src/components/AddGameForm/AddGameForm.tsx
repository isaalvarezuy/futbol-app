import { FormProvider, useForm } from "react-hook-form";
import { Team } from "@/types/Team";
import TeamSection from "./TeamSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { addGameSchema } from "@/schemas/addGame.schema";
import Paragraph from "@/components/Paragraph/Paragraph";
import { Button } from "ia-moonlight";
import CardWrapper from "@/components/CardWrapper/CardWrapper";

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

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  /*   teamOneId: data.team1.value,
      teamOneGoals: Number(data.team1GoalAmount),
      teamOneGoalScorers: formatGoalScorers(data.team1GoalScorers),
      teamTwoId: data.team2.value,
      teamTwoGoals: Number(data.team2GoalAmount),
      teamTwoGoalScorers: formatGoalScorers(data.team2GoalScorers), */

  /*  player: p.player.value,
        amount: Number(p.amount), */

  const hasErrors = Object.keys(errors).length > 0;
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <CardWrapper title="Add Game">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TeamSection teams={teams} id={1} />
          <TeamSection teams={teams} id={2} />
          {hasErrors && (
            <Paragraph color="text-red-600">
              {Object.values(errors)[0].message as string}
            </Paragraph>
          )}
          <Button className="mt-2 w-full" type="submit">
            Add game
          </Button>
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default AddGameForm;
