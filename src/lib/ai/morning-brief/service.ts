import { generateAI } from "@/lib/ai/client";
import { getMorningBriefContext } from "./context";
import { buildMorningBriefPrompt } from "./prompt";
import { MorningBriefSchema } from "./schema";

function cleanAIJson(content: string) {
  return content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

export async function generateMorningBrief(userId: string) {
  const context = await getMorningBriefContext(userId);
  const prompt = buildMorningBriefPrompt(context);

  const content = await generateAI({
    model: "minimax/minimax-m2.7:free",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "You are the HomeOS Morning Brief analyst. Return only valid JSON according to the requested schema. Never invent information. Keep user-created titles exactly unchanged.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const cleanedContent = cleanAIJson(content);

  let parsed: unknown;

  try {
    parsed = JSON.parse(cleanedContent);
  } catch (error) {
    console.error("Invalid Morning Brief JSON:", {
      error,
      content,
    });

    throw new Error("AI returned invalid JSON");
  }

  return MorningBriefSchema.parse(parsed);
}
