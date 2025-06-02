import { z } from "zod";

export const UpdateUserSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  organization: z.string().optional(),
  job: z.string().optional(),
  location: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
