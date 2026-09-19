const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

type AIMessage = {
  role: "system" | "user";
  content: string;
};

type GenerateOptions = {
  model?: string;
  temperature?: number;
  messages: AIMessage[];
};

type OpenRouterResponse = {
  choices?: {
    message?: {
      content?: string;
    };
  }[];

  error?: {
    message?: string;
    code?: number | string;
  };

  success?: boolean;
};

export async function generateAI({
  model = "openai/gpt-4o-mini",
  temperature = 0.2,
  messages,
}: GenerateOptions): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",

      // این دو هدر برای OpenRouter مفیدند
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

      "X-Title": "LifeOS",
    },

    body: JSON.stringify({
      model,
      temperature,
      messages,
    }),
  });

  const raw = await response.text();

  let data: OpenRouterResponse;

  try {
    data = JSON.parse(raw);
  } catch {
    console.error("OpenRouter returned non-JSON response:", raw);

    throw new Error(
      `OpenRouter returned invalid response (${response.status})`,
    );
  }

  if (!response.ok) {
    console.error("OpenRouter request failed:", {
      status: response.status,
      statusText: response.statusText,
      model,
      data,
    });

    throw new Error(data?.error?.message ?? "OpenRouter request failed");
  }

  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    console.error("OpenRouter returned no content:", data);

    throw new Error("AI returned an empty response");
  }

  return content;
}
