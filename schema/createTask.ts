import { z } from "zod";

export const createTaskSchema = z.object({
  collectionId: z.number().nonnegative(),
  content: z.string().min(3, {
    message: "Task content can't be less than 3 characters"
  }),
  expiresAt: z.date().optional()
});

export type SchemaType = z.infer<typeof createTaskSchema>;