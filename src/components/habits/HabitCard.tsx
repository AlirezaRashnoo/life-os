"use client";

import { Flame, Pencil } from "lucide-react";
import CompleteHabitButton from "./CompleteHabitButton";
import DeleteHabitButton from "./DeleteHabitButton";
import HabitHistory from "./HabitHistory";
import { calculateHabitStreak, calculateWeeklyProgress } from "@/lib/habits";
import { habitIcons } from "@/lib/habit-icons";

type Habit = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;

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

  const HabitIcon =
    habitIcons[habit.icon as keyof typeof habitIcons] ?? habitIcons.CheckCircle;

  const streak = calculateHabitStreak(habit.completions ?? []);

  const weeklyProgress = calculateWeeklyProgress(habit.completions ?? []);

  return (
    <div
      className="
      rounded-xl
      border
      border-border
      p-5
      "
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-primary/10
          text-primary
          "
        >
          <HabitIcon size={20} />
        </div>

        <div className="min-w-0 flex-1 space-y-0.5">
          <h3
            className="
            truncate
            text-[15px]
            font-semibold
            text-foreground
            "
          >
            {habit.title}
          </h3>

          {habit.description && (
            <p
              className="
              truncate
              text-sm
              text-muted-foreground
              "
            >
              {habit.description}
            </p>
          )}
        </div>

        <button
          onClick={() => onEdit(habit)}
          aria-label="ویرایش عادت"
          className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-border
          text-muted-foreground
          transition
          hover:bg-accent
          hover:text-foreground
          "
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>

      {/* Stats */}
      <div
        className="
        mt-5
        flex
        items-center
        justify-between
        "
      >
        <div
          className="
          flex
          items-center
          gap-1.5
          text-sm
          font-medium
          "
        >
          <Flame
            className="
            h-4
            w-4
            text-orange-500
            "
          />

          <span>{streak}</span>

          <span className="text-muted-foreground">روز پشت سرهم</span>
        </div>

        <div className="text-sm text-muted-foreground">
          این هفته{" "}
          <span
            className="
            font-medium
            text-foreground
            "
          >
            {weeklyProgress}/7
          </span>
        </div>
      </div>

      {/* History */}
      <div className="mt-3">
        <HabitHistory completions={habit.completions} />
      </div>

      {/* Actions */}
      <div
        className="
        mt-4
        flex
        items-center
        gap-2
        "
      >
        <CompleteHabitButton habitId={habit.id} completed={todayCompleted} />

        <DeleteHabitButton habitId={habit.id} />
      </div>
    </div>
  );
}
