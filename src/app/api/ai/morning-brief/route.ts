import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { generateMorningBrief } from "@/lib/ai/morning-brief/service";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const brief = await generateMorningBrief(session.user.id);

    return NextResponse.json(brief);
  } catch (error) {
    console.error("Morning brief error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate morning brief",
      },
      {
        status: 500,
      },
    );
  }
}
