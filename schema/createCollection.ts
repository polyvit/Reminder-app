import { Colors } from "@/lib/constants";
import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(3, {
    message: "The length can't be less than 3 characters"
  }),
  color: z.string().refine(color => Object.keys(Colors).includes(color))
});

export type SchemaType = z.infer<typeof createCollectionSchema>;