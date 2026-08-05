"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import HabitForm from "./HabitForm";

import { createHabit } from "@/actions/habits";

type Props = {
  open: boolean;

  onOpenChange: (open: boolean) => void;
};

export default function NewHabitDialog({ open, onOpenChange }: Props) {
  async function handleCreate(data: {
    title: string;
    description?: string;
    // color?: string;
    // icon?: string;
  }) {
    console.log("CREATE DATA:", data);

    await createHabit(data);

    console.log("CREATED");

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Habit</DialogTitle>
        </DialogHeader>

        <HabitForm onSave={handleCreate} />
      </DialogContent>
    </Dialog>
  );
}
