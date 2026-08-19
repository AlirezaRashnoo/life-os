"use client";

import { useState, KeyboardEvent } from "react";

import { Send } from "lucide-react";

type Props = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function AIChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState("");

  function submit() {
    const message = value.trim();

    if (!message || disabled) return;

    onSend(message);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <div className="border-t border-border p-4">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="پیام خود را بنویسید..."
          className="
            flex-1
            bg-transparent
            px-3
            py-2
            text-sm
            text-foreground
            outline-none
            placeholder:text-muted-foreground
          "
        />

        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim()}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-primary
            text-primary-foreground
            transition
            hover:opacity-90
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
