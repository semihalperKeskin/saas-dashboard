import { z } from "zod";

export const MoveTaskSchema = z.object({
    columnUUID: z.string().uuid(),
    taskUUID: z.string().uuid(),
    order: z.number().min(0),
    sourceColId: z.number().min(0),
    destColId: z.number().min(0),
});

export type MoveTaskInput = z.infer<typeof MoveTaskSchema>;