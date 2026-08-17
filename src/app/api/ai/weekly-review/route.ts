import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { generateWeeklyReview } from "@/lib/ai/weekly-review/service";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const review = await generateWeeklyReview(user.id);

    return NextResponse.json(review);
  } catch (error) {
    console.error("Weekly review error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate weekly review",
      },
      {
        status: 500,
      },
    );
  }
}
