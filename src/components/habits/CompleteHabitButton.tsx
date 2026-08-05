"use client";

import { useTransition } from "react";
import { toggleHabitCompletion } from "@/actions/habits";

type Props = {
  habitId: string;
  completed: boolean;
};

export default function CompleteHabitButton({ habitId, completed }: Props) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await toggleHabitCompletion(habitId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={`rounded-md px-4 py-2 text-white transition ${
        completed ? "bg-green-600" : "bg-primary"
      } disabled:opacity-50`}
    >
      {pending ? "Saving..." : completed ? "Completed ✓" : "Complete"}
    </button>
  );
}
