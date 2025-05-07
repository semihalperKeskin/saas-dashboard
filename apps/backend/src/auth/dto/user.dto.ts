import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  organization: z.string().optional(),
  job: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserDto = z.infer<typeof UserSchema>;
