"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import type { ChatMessage } from "@/types/ai-chat";

import AIChatMessage from "./ChatMessage";
import AIChatInput from "./ChatInput";

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(content: string) {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error("AI request failed");
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "متأسفانه مشکلی در ارتباط با AI پیش آمد.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        flex
        h-[calc(100vh-140px)]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-border
          p-4
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-ai-bg
          "
        >
          <Sparkles size={20} className="text-ai" />
        </div>

        <div>
          <h1 className="text-h3">دستیار هوشمند LifeOS</h1>

          <p className="text-caption text-muted-foreground">
            کمک به برنامه‌ریزی، تحلیل و تصمیم‌گیری
          </p>
        </div>
      </div>

      {/* Messages */}

      <div
        className="
          flex-1
          space-y-4
          overflow-y-auto
          p-4
        "
      >
        {messages.length === 0 && (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-center
            "
          >
            <div>
              <Sparkles
                size={32}
                className="
                  mx-auto
                  mb-3
                  text-ai
                "
              />

              <p className="text-body-sm text-muted-foreground">
                من اینجام تا برای کارها و برنامه‌هات راهنماییت کنم...
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <AIChatMessage key={message.id} message={message} />
        ))}

        {loading && (
          <div className="text-caption text-muted-foreground">
            AI در حال فکر کردن...
          </div>
        )}
      </div>

      {/* Input */}

      <AIChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
