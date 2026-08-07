"use client";

import { deleteTask } from "@/actions/tasks";
import { Trash2 } from "lucide-react";

export default function DeleteTaskButton({ id }: { id: string }) {
  async function handleDelete() {
    await deleteTask(id);
  }

  return (
    <button
      onClick={handleDelete}
      className="
      h-8
      w-8
      flex
      items-center
      justify-center
      rounded-md
      text-text-tertiary
      hover:bg-error-bg
      hover:text-error-500
      transition-colors
      duration-150
      "
      aria-label="Delete task"
    >
      <Trash2 size={15} />
    </button>
  );
}
