"use client";
import { toggleTask } from "@/actions/tasks";

export default function ToggleTaskButton({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) {
  return (
    <button
      onClick={() => toggleTask(id)}
      className="
      h-5
      w-5
      rounded
      border
      border-border
      flex
      items-center
      justify-center
      text-xs
      "
    >
      {completed ? "✓" : ""}
    </button>
  );
}
