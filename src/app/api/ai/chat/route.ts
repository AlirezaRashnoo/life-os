import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";
import { generateAIChatResponse } from "@/lib/ai/chat/service";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    const body = await request.json();

    const result = await generateAIChatResponse(user.id, body.message);

    return NextResponse.json({
      message: result,
    });
  } catch (error) {
    console.error("AI Chat error:", error);

    return NextResponse.json(
      {
        error: "AI chat failed",
      },
      {
        status: 500,
      },
    );
  }
}
