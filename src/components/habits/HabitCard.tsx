"use client";

import { Flame, Pencil } from "lucide-react";
import CompleteHabitButton from "./CompleteHabitButton";
import DeleteHabitButton from "./DeleteHabitButton";
import HabitHistory from "./HabitHistory";
import { calculateHabitStreak, calculateWeeklyProgress } from "@/lib/habits";

type Habit = {
  id: string;
  title: string;
  description: string | null;
  // color: string | null;
  // icon: string | null;

  completions: {
    id: string;
    date: Date;
  }[];
};

type Props = {
  habit: Habit;

  onEdit: (habit: Habit) => void;
};

export default function HabitCard({ habit, onEdit }: Props) {
  const todayCompleted = habit.completions.some((completion) => {
    const date = new Date(completion.date);

    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  const streak = calculateHabitStreak(habit.completions ?? []);

  const weeklyProgress = calculateWeeklyProgress(habit.completions ?? []);

  // const accentColor = habit.color ?? "#6f62e8";

  return (
    <div className="rounded-2xl border border-border bg-card p-5 transition hover:border-border-strong hover:shadow-sm">
      <div className="flex items-start gap-3">
        {/* <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{
            backgroundColor: `${accentColor}1f`,
            color: accentColor,
          }}
        >
          <span>{habit.icon ?? "✓"}</span>
        </div> */}

        <div className="min-w-0 flex-1 space-y-0.5">
          <h3 className="truncate text-[15px] font-semibold text-text-primary">
            {habit.title}
          </h3>

          {habit.description && (
            <p className="truncate text-sm text-text-secondary">
              {habit.description}
            </p>
          )}
        </div>

        <button
          onClick={() => onEdit(habit)}
          aria-label="Edit habit"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:border-border-strong hover:text-text-primary"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-text-primary">{streak}</span>
          <span className="text-text-secondary">day streak</span>
        </div>

        <div className="text-sm text-text-secondary">
          This week{" "}
          <span className="font-medium text-text-primary">
            {weeklyProgress}/7
          </span>
        </div>
      </div>

      <div className="mt-3">
        <HabitHistory completions={habit.completions} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <CompleteHabitButton habitId={habit.id} completed={todayCompleted} />

        <DeleteHabitButton habitId={habit.id} />
      </div>
    </div>
  );
}
