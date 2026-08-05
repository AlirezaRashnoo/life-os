"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NoteEditor({
  onSave,
  initialTitle = "",
  initialContent = "",
}: {
  onSave?: (note: { title: string; content: string }) => void;

  initialTitle?: string;
  initialContent?: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  function handleSave() {
    if (!title.trim()) return;

    onSave?.({
      title,
      content,
    });
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Write your thoughts..."
        className="min-h-[180px] resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button">
          Cancel
        </Button>

        <Button type="button" onClick={handleSave}>
          Save note
        </Button>
      </div>
    </div>
  );
}
