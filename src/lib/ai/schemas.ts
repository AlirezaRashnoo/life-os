import { z } from "zod";

export const AIResponseSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("create_task"),
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().max(2000).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    dueDate: z.string().datetime().nullable(),
  }),

  z.object({
    action: z.literal("none"),
    message: z.string(),
  }),
]);

export type AIResponse = z.infer<typeof AIResponseSchema>;
