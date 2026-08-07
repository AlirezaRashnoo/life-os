"use client";

import { useState } from "react";
import { habitIcons, HabitIconName } from "@/lib/habit-icons";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = {
  onSave: (data: {
    title: string;
    description?: string;
    icon?: string;
  }) => void;
};

export default function HabitForm({ onSave }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [icon, setIcon] = useState<HabitIconName>("CheckCircle");

  function handleSave() {
    if (!title.trim()) return;

    onSave({
      title,
      description,
      icon,
    });

    setTitle("");
    setDescription("");
    setIcon("CheckCircle");
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="عنوان عادت..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="توضیحات..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">انتخاب آیکن</p>

        <div
          className="
          grid
          grid-cols-6
          gap-2
          "
        >
          {Object.entries(habitIcons).map(([name, Icon]) => (
            <button
              key={name}
              type="button"
              onClick={() => setIcon(name as HabitIconName)}
              className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    transition

                    ${
                      icon === name
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-accent"
                    }
                  `}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>

      <Button className="w-full" onClick={handleSave}>
        ایجاد عادت
      </Button>
    </div>
  );
}
