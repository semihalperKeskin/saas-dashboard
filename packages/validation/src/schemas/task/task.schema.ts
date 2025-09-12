import { z } from "zod";

export const TaskSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),
  order: z.number().default(0),
  column: z.string().uuid(),
  uuid: z.string().uuid(),
  id: z.number(),
  createDate: z.date(),
  updateDate: z.date(),
});

export type TaskInput = z.infer<typeof TaskSchema>;
