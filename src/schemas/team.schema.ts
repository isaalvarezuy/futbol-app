import { z } from "zod";

export const teamSchema = z.object({
  crest: z
    .custom<FileList>()
    .refine((file) => file?.length == 1, "Crest is required."),
  name: z.string().min(1, "Team name is required"),
});
