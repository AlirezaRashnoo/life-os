"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { TaskPriority } from "@prisma/client";

export default function TaskForm({
  onSave,
  initialTitle = "",
  initialDescription = "",
  initialPriority = TaskPriority.MEDIUM,
}: {
  onSave: (data: {
    title: string;
    description?: string;
    priority: TaskPriority;
  }) => void;

  initialTitle?: string;

  initialDescription?: string;

  initialPriority?: TaskPriority;
}) {
  const [title, setTitle] = useState(initialTitle);

  const [description, setDescription] = useState(initialDescription);

  const [priority, setPriority] = useState<TaskPriority>(initialPriority);

  function handleSubmit() {
    if (!title.trim()) return;

    onSave({
      title,
      description,
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority(TaskPriority.MEDIUM);
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="عنوان کار..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="توضیحات..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="space-y-2">
        <label className="text-caption text-text-secondary">اولویت</label>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="
          w-full
          rounded-md
          border
          border-border
          bg-background
          px-3
          py-2
          text-body
          "
        >
          <option value={TaskPriority.LOW}>پایین</option>

          <option value={TaskPriority.MEDIUM}>متوسط</option>

          <option value={TaskPriority.HIGH}>بالا</option>
        </select>
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        ذخیره
      </Button>
    </div>
  );
}
