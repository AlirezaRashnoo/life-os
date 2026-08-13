"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import TaskForm from "./TaskForm";
import { createTask } from "@/actions/tasks";
import { useState } from "react";

export default function NewTaskDialog() {
  const [open, setOpen] = useState(false);

  async function handleCreate(data: any) {
    await createTask(data);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>+ کار جدید</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ایجاد کار</DialogTitle>
        </DialogHeader>

        <TaskForm onSave={handleCreate} />
      </DialogContent>
    </Dialog>
  );
}
