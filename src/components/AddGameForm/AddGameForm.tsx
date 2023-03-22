import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Team } from "@/types/Team";
import { Player } from "@/types/responses/Player";
import Button from "@/components/Button/Button";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import TeamSection from "./TeamSection";
import { yupResolver } from "@hookform/resolvers/yup";

const AddGameForm = ({
  teams,
  players,
}: {
  teams: Team[];
  players: Player[];
}) => {
  const schema = z
    .object({
      team1GoalAmount: z.string(),
      team1: z.string(),
      team1GoalScorers: z.array(
        z.object({ playerId: z.string(), amount: z.string() })
      ),
      team2: z.string(),
    })
    .refine(
      (data) => {
        const { team1, team2 } = data;
        return team1 !== team2;
      },
      { message: "Both teams must be different" }
    )
    .refine(
      (data) => {
        const { team1GoalScorers, team1GoalAmount } = data;
        const totalFromPlayers = team1GoalScorers.reduce(
          (accum, goalScorer) => accum + parseInt(goalScorer.amount),
          0
        );

        return totalFromPlayers === parseInt(team1GoalAmount);
      },
      {
        message: "Goals per team must match the sum of goals per player.",
      }
    );

  const methods = useForm({ resolver: zodResolver(schema) });
  const {
    handleSubmit,
    formState: { errors },
    getValues,
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
          {/*   <>
            <div className="flex w-full gap-2 text-sm font-body">
              <Controller
                name="team1"
                control={control}
                render={({ field }) => (
                  <Select options={teamOptions} {...field} ref={null} />
                )}
              />

              <div className="w-[60px]">
                <Controller
                  name={"team1GoalAmount"}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      errors={errors}
                      type="number"
                      ref={null}
                    />
                  )}
                />
              </div>
            </div>
            {fields.map((field, index) => {
              const prefix = `team1GoalScorers[${index}]`;
              if (parseInt(team1Goals) > 0)
                return (
                  <div
                    key={field.id}
                    className="flex w-full gap-2 text-sm font-body"
                  >
                    <Controller
                      name={`${prefix}.playerId`}
                      control={control}
                      render={({ field }) => (
                        <Select options={team1Players} {...field} ref={null} />
                      )}
                    />
                    <div className="w-[60px]">
                      <Controller
                        name={`team1GoalScorers[${index}].amount`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            errors={errors}
                            type="number"
                            {...field}
                            ref={null}
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
            {parseInt(team1Goals) > 0 && (
              <Button
                variant="secondary"
                onClick={() => {
                  append({
                    playerId: team1Players[0].value,
                    amount: 1,
                  });
                }}
              >
                <>
                  <Plus className="h-4" />
                  Add player
                </>
              </Button>
            )}

            <span className="text-xs text-center font-body">vs.</span>

           
          </> */}
          <Button type="submit">Add Game</Button>
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default AddGameForm;
