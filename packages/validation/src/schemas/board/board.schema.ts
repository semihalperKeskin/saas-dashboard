import { z } from "zod";
import { TaskSchema } from "@vizionboard/validation";

export const BoardStateSchema = z.object({
  id: z.number(),
  order: z.number(),
  tasks: z.array(TaskSchema),
  title: z.string(),
  uuid: z.string(),
  createDate: z.date(),
  updateDate: z.date(),
});

export type BoardStateInput = z.infer<typeof BoardStateSchema>;
