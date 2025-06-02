import { z } from "zod";
import { UpdateUserSchema } from "./update.schema";

export const UserSchema = UpdateUserSchema.extend({
  id: z.number(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

export type UserInput = z.infer<typeof UserSchema>;
