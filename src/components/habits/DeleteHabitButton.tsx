"use client";

import { useTransition } from "react";
import { deleteHabit } from "@/actions/habits";

type Props = {
  habitId: string;
};

export default function DeleteHabitButton({ habitId }: Props) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteHabit(habitId);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="rounded-md bg-red-600 px-3 py-2 text-sm text-white disabled:opacity-50"
    >
      {pending ? "در حال حذف..." : "حذف"}
    </button>
  );
}
