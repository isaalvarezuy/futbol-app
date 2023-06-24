import { z } from "zod";

export const userTeamSchema = z.object({
  team: z.string().min(1),
});
