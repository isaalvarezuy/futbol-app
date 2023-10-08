import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Team } from "@/types/Team";
import Button from "@/components/Button/Button";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import TeamSection from "./TeamSection";
import { addGameSchema } from "@/schemas/addGame.schema";
import Paragraph from "../Paragraph/Paragraph";
import { IAddGameForm, ITeamGoalScorer } from "@/types/forms/AddGameForm";
import { showNotification } from "@/utils/showNotification";
import { useMutation, useQueryClient } from "react-query";
import { useGames } from "@/hooks/services/games/useGames";
import { useStore } from "@/hooks/store/useStore";
import { useUserStore } from "@/hooks/store/useUserStore";
import { useEffect } from "react";
import EmptyState from "../EmptyState/EmptyState";
import { ShieldOff } from "react-feather";
import { useNavigate } from "react-router-dom";

const AddGameForm = () => {
  const teams = useStore((state) => state.teams);
  const userTeam = useUserStore((store) => store.user?.team);
  const navigate = useNavigate();

  const { addGame } = useGames();
  const methods = useForm({
    resolver: zodResolver(addGameSchema),
    defaultValues: {
      team1: { label: userTeam?.name || "", value: userTeam?.id || "" },
      team1GoalAmount: "0",
      team1GoalScorers: [],
      team2: { label: "", value: "" },
      team2GoalAmount: "0",
      team2GoalScorers: [],
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    const otherTeams = teams.filter((team) => team.id !== userTeam?.id);
    reset({
      team1: { label: userTeam?.name || "", value: userTeam?.id || "" },
      team1GoalAmount: "0",
      team1GoalScorers: [],
      team2: { label: otherTeams[0]?.name, value: otherTeams[0]?.id },
      team2GoalAmount: "0",
      team2GoalScorers: [],
    });
  }, [teams, userTeam]);

  const queryClient = useQueryClient();

  const handleFormSuccess = () => {
    reset();
    queryClient.invalidateQueries("get-teams");
    queryClient.invalidateQueries("get-team");
    showNotification("Game added correctly", 2000, "success");
  };

  const { mutate, isLoading } = useMutation(addGame, {
    onSuccess: handleFormSuccess,
  });

  const formatGoalScorers = (scorers: ITeamGoalScorer[]) => {
    const formattedScorers = scorers.map((p) => {
      return {
        player: p.player.value,
        amount: Number(p.amount),
      };
    });
    return JSON.stringify(formattedScorers);
  };

  const onSubmit = (data: IAddGameForm) => {
    const requestBody = {
      teamOneId: data.team1.value,
      teamOneGoals: Number(data.team1GoalAmount),
      teamOneGoalScorers: formatGoalScorers(data.team1GoalScorers),
      teamTwoId: data.team2.value,
      teamTwoGoals: Number(data.team2GoalAmount),
      teamTwoGoalScorers: formatGoalScorers(data.team2GoalScorers),
    };
    mutate(requestBody);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <CardWrapper title="Add Game">
      {userTeam ? (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-2"
          >
            <TeamSection label="team1" teams={[userTeam]} />
            <span className="font-body text-xs text-center font-medium text-gray-700">
              vs.
            </span>
            <TeamSection
              label="team2"
              teams={teams.filter((team) => team.id !== userTeam.id)}
            />
            <Button loading={isLoading} type="submit">
              Add Game
            </Button>
            {hasErrors && (
              <Paragraph color="text-red-600">
                {Object.values(errors)[0].message as string}
              </Paragraph>
            )}
          </form>
        </FormProvider>
      ) : (
        <EmptyState
          icon={<ShieldOff />}
          title={"Set your team first"}
          description="Add your team first to be able to add games."
          action={
            <Button onClick={() => navigate("/my-team")}>Set team</Button>
          }
        />
      )}
    </CardWrapper>
  );
};

export default AddGameForm;
