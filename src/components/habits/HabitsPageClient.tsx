"use client";

import { useState } from "react";
import EditHabitDialog from "./EditHabitDialog";
import NewHabitDialog from "./NewHabitDialog";
import HabitCard from "./HabitCard";
import EmptyState from "../ui/EmptyState";

type Habit = {
  id: string;
  title: string;
  description: string | null;
  color: string | null;
  icon: string | null;

  completions: {
    id: string;
    date: Date;
  }[];
};

type Props = {
  habits: Habit[];
};

export default function HabitsPageClient({ habits }: Props) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedHabit, setSelectedHabit] = useState<Habit>();

  function handleEdit(habit: Habit) {
    setSelectedHabit(habit);

    setEditOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-text-primary">Habits</h1>

          <p className="mt-1 text-body text-text-secondary">
            Build better habits, one day at a time.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-primary px-4 py-2 text-white"
        >
          + New Habit
        </button>
      </div>

      {habits.length === 0 ? (
        <EmptyState
          title="No habit yet"
          description="Create your first habit and try to do that"
        />
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onEdit={handleEdit} />
          ))}
        </div>
      )}

      <NewHabitDialog open={open} onOpenChange={setOpen} />

      <EditHabitDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        habit={selectedHabit}
      />
    </>
  );
}
