"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import { useState } from "react";

import TaskForm from "./TaskForm";
import { updateTask } from "@/actions/tasks";

import { Task, TaskPriority } from "@prisma/client";

export default function EditTaskDialog({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);

  async function handleUpdate(data: {
    title: string;
    description?: string;
    priority: TaskPriority;
  }) {
    await updateTask(task.id, data);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="
          h-8
          w-8
          flex
          items-center
          justify-center
          rounded-md

          text-text-tertiary

          hover:bg-surface-2
          hover:text-text-primary

          transition-colors
          "
          aria-label="Edit task"
        >
          <Pencil size={15} />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش وظیفه</DialogTitle>
        </DialogHeader>

        <TaskForm
          initialTitle={task.title}
          initialDescription={task.description ?? ""}
          initialPriority={task.priority}
          onSave={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
