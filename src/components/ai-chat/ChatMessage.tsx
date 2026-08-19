"use client";

import { Bot, User } from "lucide-react";

import type { ChatMessage } from "@/types/ai-chat";

type Props = {
  message: ChatMessage;
};

export default function AIChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-start" : "justify-end"}`}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ai-bg">
          <Bot size={16} className="text-ai" />
        </div>
      )}

      <div
        className={
          isUser
            ? `
              max-w-[80%]
              rounded-2xl
              rounded-tr-sm
              bg-primary
              px-4
              py-3
              text-sm
              text-primary-foreground
            `
            : `
              max-w-[80%]
              rounded-2xl
              rounded-tl-sm
              border
              border-border
              bg-muted/40
              px-4
              py-3
              text-sm
              text-foreground
            `
        }
      >
        <p className="leading-7 whitespace-pre-wrap">{message.content}</p>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
          <User size={16} className="text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
