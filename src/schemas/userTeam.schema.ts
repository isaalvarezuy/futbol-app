import { z } from "zod";

export const userTeamSchema = z
  .object({
    team: z.string().min(1),
    crest: z.custom<FileList>().optional(),
    name: z.string().optional(),
  })
  .refine(
    (schema) => {
      if (schema.team !== "create") {
        return true;
      }
      return !!schema.name; // Ensure the name is truthy for "create" teams
    },
    { message: "Team name is required" }
  )
  .refine(
    (schema) => {
      if (schema.team !== "create") {
        return true;
      }
      return schema.crest?.length === 1; // Ensure the name is truthy for "create" teams
    },
    { message: "Team crest is required" }
  );
/*  .refine((schema) => schema.team === "create" && !!schema.crest?.length, {
    message: "Team crest is required",
  });
 */
