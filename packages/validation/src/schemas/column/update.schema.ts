import { z } from "zod";

export const ColumnSchema = z.object({
  uuid: z.string().uuid(),
  title: z.string().min(1, { message: "Title is required" }),
  order: z.number().min(0).optional(),
});

export type ColumnInput = z.infer<typeof ColumnSchema>;
