import { z } from "zod";

export const addGameSchema = z
  .object({
    goals1: z.string().min(1),
    team1: z.string().min(1),
    goalScorers1: z.array(
      z.object({
        player: z.string(),
        goals: z.string(),
      })
    ),
    goalScorers2: z.array(
      z.object({
        player: z.string(),
        goals: z.string(),
      })
    ),
    goals2: z.string().min(1),
    team2: z.string().min(1),
  })
  .refine(
    (data) => {
      const { team1, team2 } = data;
      return team1 !== team2;
    },
    {
      path: ["team1", "team2"],
      message: "Both teams must be different",
    }
  )
  .refine(
    (data) => {
      const { goalScorers1, goals1 } = data;
      if (!goalScorers1) return true;
      const totalFromPlayers = goalScorers1?.reduce(
        (accum, goalScorer) => accum + parseInt(goalScorer.goals),
        0
      );

      return totalFromPlayers === Number(goals1);
    },
    {
      path: ["goals1"],
      message: "Goals per team must match the sum of goals per player.",
    }
  )
  .refine(
    (data) => {
      const { goalScorers2, goals2 } = data;
      if (!goalScorers2) return true;
      const totalFromPlayers = goalScorers2?.reduce(
        (accum, goalScorer) => accum + parseInt(goalScorer.goals),
        0
      );
      return totalFromPlayers === Number(goals2);
    },
    {
      path: ["goals2"],
      message: "Goals per team must match the sum of goals per player.",
    }
  );
