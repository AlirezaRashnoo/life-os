import { z } from "zod";

export const MorningBriefSchema = z.object({
  greeting: z.string(),

  summary: z.string(),

  priorities: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
    }),
  ),

  schedule: z.array(
    z.object({
      time: z.string(),
      title: z.string(),
    }),
  ),

  habits: z.array(
    z.object({
      title: z.string(),
      status: z.enum(["completed", "pending"]),
    }),
  ),

  recommendation: z.string(),
});

export type MorningBrief = z.infer<typeof MorningBriefSchema>;
