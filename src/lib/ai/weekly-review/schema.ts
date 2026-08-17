import { z } from "zod";

export const WeeklyReviewSchema = z.object({
  title: z.string(),
  summary: z.string(),

  achievements: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),

  attention: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),

  insights: z.array(z.string()),

  recommendations: z.array(z.string()),
});

export type WeeklyReview = z.infer<typeof WeeklyReviewSchema>;
