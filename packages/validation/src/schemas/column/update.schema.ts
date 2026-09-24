import { z } from "zod";

export const ColumnSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export type ColumnInput = z.infer<typeof ColumnSchema>;
