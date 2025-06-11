import { z } from 'zod';

export const AuthSchema = z.object({
    email: z.string().email(),
    password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .refine((val) => val.trim() !== "", {
      message: "Password cannot be empty",
    }),
})

export type AuthInput = z.infer<typeof AuthSchema>;