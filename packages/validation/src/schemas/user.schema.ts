import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().optional().nullable().default(""),
  name: z.string().optional().nullable().default(""),
  organization: z.string().optional().nullable().default(""),
  job: z.string().optional().nullable().default(""),
  location: z.string().optional().nullable().default(""),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .refine((val) => val.trim() !== "", {
      message: "Password cannot be empty",
    }),
});

export type UserInput = z.infer<typeof UserSchema>;
