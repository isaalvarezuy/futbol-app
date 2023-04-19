import { z } from "zod";

export const playerSchema = z.object({
  name: z.string().min(1, " Name is required"),
  number: z
    .string()
    .min(1, "Number is required")
    .max(2, "Number can have up to 2 characters"),
  photo: z
    .custom<FileList>()
    .refine((file) => file?.length == 1, "Photo is required."),
});
