import { z } from "zod";

export const CreateTaskSchema = z.object({
    content: z.string().min(1).max(255),
    order: z.number().default(0),
    columnUUID: z.string().uuid(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
