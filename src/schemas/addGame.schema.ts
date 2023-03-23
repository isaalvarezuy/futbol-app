import { z } from "zod";

export const addGameSchema = z
  .object({
    team1GoalAmount: z.string().min(1),
    team1: z.object({ value: z.string(), label: z.string() }),
    team1GoalScorers: z.array(
      z.object({
        player: z.object({ label: z.string(), value: z.string() }),
        amount: z.string(),
      })
    ),
    team2: z.object({ value: z.string(), label: z.string() }),
  })
  .refine(
    (data) => {
      const { team1, team2 } = data;
      return team1.value !== team2.value;
    },
    {
      path: ["team1", "team2"],
      message: "Both teams must be different",
    }
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
      path: ["team1GoalAmount"],
      message: "Goals per team must match the sum of goals per player.",
    }
  );
