import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Team } from "@/types/Team";
import { Player } from "@/types/responses/Player";
import Button from "@/components/Button/Button";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import TeamSection from "./TeamSection";
import { addGameSchema } from "@/schemas/addGame.schema";

const AddGameForm = ({
  teams,
  players,
}: {
  teams: Team[];
  players: Player[];
}) => {
  const methods = useForm({
    resolver: zodResolver(addGameSchema),
    defaultValues: {
      team1: { label: teams[0].name, value: teams[0].id },
      team1GoalAmount: 0,
      team1GoalScorers: [],
      team2: { label: teams[1].name, value: teams[1].id },
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <CardWrapper title="Add Game">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-2"
        >
          <TeamSection label="team1" teams={teams} players={players} />
          <TeamSection label="team2" teams={teams} players={players} />
          <Button type="submit">Add Game</Button>
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default AddGameForm;
