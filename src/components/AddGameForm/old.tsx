/* import { FormProvider, useForm } from "react-hook-form";
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



import { SelectOption } from "@/types/components/SelectOption";
import { Player } from "@/types/responses/Player";
import { Team } from "@/types/Team";
import { getTeamPlayers, transformToSelectOption } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "react-feather";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { FieldValues } from "react-hook-form";

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

interface Props {
  label: string;
  teams: Team[];
}

const TeamSection = ({ label, teams }: Props) => {
  const {
    control,
    watch,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `${label}GoalScorers`,
    control,
  });

  const watchGoalScorers = useWatch({
    control,
    name: `${label}GoalScorers`,
    defaultValue: [],
  });

  const [teamGoals, setTeamGoals] = useState(getValues(`${label}GoalAmount`));
  const [teamPlayers, setTeamPlayers] = useState<SelectOption[]>([]);
  const [canAddGoalScorer, setCanAddGoalScorer] = useState(true);
  const teamOptions = transformToSelectOption(teams);

  const watchTeam = watch(`${label}`);
  const watchTeamGoals = watch(`${label}GoalAmount`);

  useEffect(() => {
    setTeamGoals(watchTeamGoals);
  }, [watchTeamGoals]);

  const toggleAddGoalscorerButton = (
    totalGoalsPerPlayers: number,
    watchTeamGoals: string
  ) => {
    if (totalGoalsPerPlayers >= parseInt(watchTeamGoals)) {
      setCanAddGoalScorer(false);
    } else {
      setCanAddGoalScorer(true);
    }
  };

  useEffect(() => {
    const totalGoalsPerPlayers = watchGoalScorers.reduce(
      (acc: number, curr: { player: SelectOption; amount: string }) => {
        return acc + parseInt(curr.amount);
      },
      0
    );
    toggleAddGoalscorerButton(totalGoalsPerPlayers, watchTeamGoals);
  }, [watchGoalScorers, watchTeamGoals]);

  useEffect(() => {
    setTeamPlayers(
      transformToSelectOption(getTeamPlayers(watchTeam.value, teams))
    );
    setValue(`${label}GoalScorers`, []);
  }, [watchTeam, teams]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-2 text-sm font-body">
        <Select
          options={teamOptions}
          control={control}
          name={`${label}`}
          errors={errors}
        />

        <div className="w-[60px]">
          <Input
            errors={errors}
            type="number"
            {...register(`${label}GoalAmount`)}
          />
        </div>
      </div>
      {fields.map((field, index) => {
        const prefix = `${label}GoalScorers[${index}]`;
        if (parseInt(teamGoals) > 0)
          return (
            <div key={field.id} className="flex w-full gap-2 text-sm font-body">
              <Select
                options={teamPlayers}
                control={control}
                name={`${prefix}.player`}
                errors={errors}
              />

              <div className="w-[60px]">
                <Controller
                  name={`${prefix}.amount`}
                  control={control}
                  render={({ field }: { field: FieldValues }) => (
                    <Input
                      errors={errors}
                      type="number"
                      {...register(`${prefix}.amount`)}
                    />
                  )}
                />
              </div>
              <div className="w-[30px] flex items-center">
                <button onClick={() => remove(index)}>
                  <Trash2 className="h-4 text-red-600 hover:text-red-400" />
                </button>
              </div>
            </div>
          );
      })}
      {parseInt(teamGoals) > 0 && (
        <Button
          disabled={!canAddGoalScorer}
          variant="secondary"
          onClick={() => {
            append({
              player: teamPlayers[0],
              amount: "1",
            });
          }}
        >
          <>
            <Plus className="h-4" />
            Add goal scorer
          </>
        </Button>
      )}
    </div>
  );
};

export default TeamSection;
 */