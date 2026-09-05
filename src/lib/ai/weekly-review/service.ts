import { generateAI } from "@/lib/ai/client";

import { getWeeklyReviewContext } from "./context";
import { buildWeeklyReviewPrompt } from "./prompt";
import { WeeklyReviewSchema } from "./schema";

export async function generateWeeklyReview(userId: string) {
  const context = await getWeeklyReviewContext(userId);

  const prompt = buildWeeklyReviewPrompt(context);

  const content = await generateAI({
    model: "minimax/minimax-m2.7:free",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "You are HomeOS, an evidence-based productivity analyst. Return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const cleanedContent = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let parsed: unknown;

  try {
    parsed = JSON.parse(cleanedContent);
  } catch {
    console.error("Invalid Weekly Review JSON:", content);
    throw new Error("AI returned invalid JSON");
  }

  const review = WeeklyReviewSchema.parse(parsed);

  return {
    review,
    statistics: context.statistics,
    week: context.week,
  };
}
