"use client";

import { useState } from "react";

export default function AITestPage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">HomeOS AI Test</h1>

      <div className="mt-6 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="مثلاً: فردا ساعت ۹ پروژه HomeOS را دیپلوی کنم"
          className="border p-2 w-full"
        />

        <button
          onClick={send}
          disabled={loading}
          className="bg-primary text-white px-4 rounded"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

      <pre className="mt-6 whitespace-pre-wrap">{result}</pre>
    </div>
  );
}
