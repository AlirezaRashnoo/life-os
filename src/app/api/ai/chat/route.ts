import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { createTaskForAI } from "@/lib/ai/tools/create-task";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    const { message } = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: `
You are HomeOS AI Copilot.

You help the user manage their personal productivity.

If user asks to create a task return ONLY JSON:

{
  "action": "create_task",
  "title": "...",
  "description": "...",
  "priority": "LOW | MEDIUM | HIGH",
  "dueDate": "ISO_DATE_OR_NULL"
}

Otherwise:

{
  "action": "none",
  "message": "..."
}
`,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);

      return NextResponse.json(
        {
          error: "OpenRouter request failed",
          details: data,
        },
        {
          status: response.status,
        },
      );
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        {
          error: "Empty AI response",
        },
        {
          status: 500,
        },
      );
    }

    let result;

    try {
      result = JSON.parse(content);
    } catch {
      return NextResponse.json({
        action: "none",
        message: content,
      });
    }

    if (result.action === "create_task") {
      const task = await createTaskForAI(user.id, {
        title: result.title,
        description: result.description,
        priority: result.priority,
        dueDate: result.dueDate ? new Date(result.dueDate) : undefined,
      });

      return NextResponse.json({
        action: "create_task",
        task,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI error:", error);

    return NextResponse.json(
      {
        error: "AI request failed",
      },
      {
        status: 500,
      },
    );
  }
}

// import { NextResponse } from "next/server";

// import { getCurrentUser } from "@/lib/current-user";
// import { createTaskForAI } from "@/lib/ai/tools/create-task";
// import { AIResponseSchema } from "@/lib/ai/schemas";

// const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// const MODEL = process.env.OPENROUTER_MODEL ?? "openrouter/free";

// export async function POST(req: Request) {
//   try {
//     // --------------------------------
//     // 1. Authentication
//     // --------------------------------

//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "UNAUTHORIZED",
//             message: "Unauthorized",
//           },
//         },
//         { status: 401 },
//       );
//     }

//     // --------------------------------
//     // 2. Check API configuration
//     // --------------------------------

//     const apiKey = process.env.OPENROUTER_API_KEY;

//     if (!apiKey) {
//       console.error("OPENROUTER_API_KEY is missing");

//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "AI_NOT_CONFIGURED",
//             message: "AI service is not configured",
//           },
//         },
//         { status: 500 },
//       );
//     }

//     // --------------------------------
//     // 3. Parse request
//     // --------------------------------

//     let body: unknown;

//     try {
//       body = await req.json();
//     } catch {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "INVALID_JSON",
//             message: "Invalid JSON body",
//           },
//         },
//         { status: 400 },
//       );
//     }

//     // --------------------------------
//     // 4. Validate message
//     // --------------------------------

//     if (
//       typeof body !== "object" ||
//       body === null ||
//       !("message" in body) ||
//       typeof body.message !== "string"
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "INVALID_REQUEST",
//             message: "Message is required",
//           },
//         },
//         { status: 400 },
//       );
//     }

//     const message = body.message.trim();

//     if (!message) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "EMPTY_MESSAGE",
//             message: "Message cannot be empty",
//           },
//         },
//         { status: 400 },
//       );
//     }

//     // Prevent unnecessarily huge requests
//     if (message.length > 4000) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "MESSAGE_TOO_LONG",
//             message: "Message is too long",
//           },
//         },
//         { status: 400 },
//       );
//     }

//     // --------------------------------
//     // 5. Call OpenRouter
//     // --------------------------------

//     const response = await fetch(OPENROUTER_URL, {
//       method: "POST",

//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",

//         // OpenRouter app attribution
//         "HTTP-Referer":
//           process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

//         "X-OpenRouter-Title": "HomeOS",
//       },

//       body: JSON.stringify({
//         model: MODEL,

//         messages: [
//           {
//             role: "system",
//             content: `
// You are HomeOS AI Copilot.

// You help the user manage their personal productivity.

// Your job is to understand the user's request and return ONLY valid JSON.

// If the user clearly asks to create a task, return:

// {
//   "action": "create_task",
//   "title": "...",
//   "description": "...",
//   "priority": "LOW | MEDIUM | HIGH",
//   "dueDate": "ISO_DATE_OR_NULL"
// }

// If the user is NOT asking to create a task, return:

// {
//   "action": "none",
//   "message": "..."
// }

// Rules:

// - Return ONLY JSON.
// - Never return markdown.
// - Never wrap JSON inside \`\`\`.
// - title must not be empty.
// - priority must be LOW, MEDIUM, or HIGH.
// - dueDate must be a valid ISO 8601 datetime or null.
// - If no due date exists, use null.
//             `.trim(),
//           },

//           {
//             role: "user",
//             content: message,
//           },
//         ],
//       }),
//     });

//     // --------------------------------
//     // 6. Parse OpenRouter response
//     // --------------------------------

//     const data: unknown = await response.json();

//     if (!response.ok) {
//       console.error("OpenRouter request failed:", {
//         status: response.status,
//         data,
//       });

//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "OPENROUTER_ERROR",
//             message: "OpenRouter request failed",
//             details: data,
//           },
//         },
//         {
//           status: response.status,
//         },
//       );
//     }

//     // --------------------------------
//     // 7. Extract AI content
//     // --------------------------------

//     const content =
//       typeof data === "object" &&
//       data !== null &&
//       "choices" in data &&
//       Array.isArray(data.choices)
//         ? data.choices[0]?.message?.content
//         : undefined;

//     if (typeof content !== "string" || !content.trim()) {
//       console.error("OpenRouter returned empty content:", data);

//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "EMPTY_AI_RESPONSE",
//             message: "AI returned an empty response",
//           },
//         },
//         { status: 502 },
//       );
//     }

//     // --------------------------------
//     // 8. Parse AI JSON
//     // --------------------------------

//     let parsedJson: unknown;

//     try {
//       parsedJson = JSON.parse(content);
//     } catch {
//       console.error("AI returned invalid JSON:", content);

//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "INVALID_AI_JSON",
//             message: "AI returned invalid JSON",
//           },
//         },
//         { status: 502 },
//       );
//     }

//     // --------------------------------
//     // 9. Validate AI output with Zod
//     // --------------------------------

//     const result = AIResponseSchema.safeParse(parsedJson);

//     if (!result.success) {
//       console.error(
//         "AI response failed schema validation:",
//         result.error.flatten(),
//       );

//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "INVALID_AI_OUTPUT",
//             message: "AI returned an invalid response",
//           },
//         },
//         { status: 502 },
//       );
//     }

//     // --------------------------------
//     // 10. Handle create_task
//     // --------------------------------

//     if (result.data.action === "create_task") {
//       const dueDate = result.data.dueDate
//         ? new Date(result.data.dueDate)
//         : undefined;

//       if (dueDate && Number.isNaN(dueDate.getTime())) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: {
//               code: "INVALID_DUE_DATE",
//               message: "Invalid due date",
//             },
//           },
//           { status: 502 },
//         );
//       }

//       const task = await createTaskForAI(user.id, {
//         title: result.data.title,
//         description: result.data.description,
//         priority: result.data.priority,
//         dueDate,
//       });

//       return NextResponse.json({
//         success: true,
//         action: "create_task",
//         task,
//       });
//     }

//     // --------------------------------
//     // 11. Normal AI response
//     // --------------------------------

//     return NextResponse.json({
//       success: true,
//       action: "none",
//       message: result.data.message,
//     });
//   } catch (error) {
//     console.error("AI route error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: {
//           code: "INTERNAL_ERROR",
//           message: "AI request failed",
//         },
//       },
//       { status: 500 },
//     );
//   }
// }
