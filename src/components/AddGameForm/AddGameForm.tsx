import { FormProvider, useForm } from "react-hook-form";
import { Team } from "@/types/Team";
import TeamSection from "./TeamSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { addGameSchema } from "@/schemas/addGame.schema";
import Paragraph from "@/components/Paragraph/Paragraph";
import { Button } from "ia-moonlight";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";
import { useGames } from "@/hooks/services/games/useGames";
import { showNotification } from "@/utils/showNotification";
import { ITeamGoalScorer } from "@/types/forms/AddGameForm";

type FormValues = z.infer<typeof addGameSchema>;
const AddGameForm = ({ teams }: { teams: Team[] }) => {
  const methods = useForm<FormValues>({
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
    reset,
  } = methods;

  const queryClient = useQueryClient();

  const handleFormSuccess = () => {
    reset();
    queryClient.invalidateQueries("get-teams");
    queryClient.invalidateQueries("get-team");
    showNotification("Game added correctly", 2000, "success");
  };

  const { addGame } = useGames();
  const { mutate, isLoading } = useMutation(addGame, {
    onSuccess: handleFormSuccess,
  });

 

  const formatGoalScorers = (scorers: ITeamGoalScorer[]) => {
    const formattedScorers = scorers.map((p) => ({
      player: p.player,
      amount: Number(p.goals),
    }));
    return JSON.stringify(formattedScorers);
  };

  const hasErrors = Object.keys(errors).length > 0;
  const onSubmit = (data: FormValues) => {
    const requestBody = {
      teamOneId: data.team1,
      teamOneGoals: Number(data.goals1),
      teamOneGoalScorers: formatGoalScorers(data.goalScorers1),
      teamTwoId: data.team2,
      teamTwoGoals: Number(data.goals2),
      teamTwoGoalScorers: formatGoalScorers(data.goalScorers2),
    };
    mutate(requestBody);
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
          <Button className="mt-2 w-full" type="submit" loading={isLoading}>
            Add game
          </Button>
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default AddGameForm;
