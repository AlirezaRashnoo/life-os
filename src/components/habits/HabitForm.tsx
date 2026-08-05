"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = {
  onSave: (data: {
    title: string;
    description?: string;
    // color?: string;
    // icon?: string;
  }) => void;
};

export default function HabitForm({ onSave }: Props) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  // const [icon, setIcon] = useState("");

  // const [color, setColor] = useState("");

  function handleSave() {
    if (!title.trim()) return;

    onSave({
      title,
      description,
      // icon,
      // color,
    });

    setTitle("");
    setDescription("");
    // setIcon("");
    // setColor("");
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Habit title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* <Input
        placeholder="Icon (🔥, 📚, 🏃)"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
      />

      <Input
        placeholder="Color (#22c55e)"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      /> */}

      <Button className="w-full" onClick={handleSave}>
        Create Habit
      </Button>
    </div>
  );
}
