"use client";

import { deleteNote } from "@/actions/notes";
import { useTransition } from "react";

export default function DeleteNoteButton({ noteId }: { noteId: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteNote(noteId);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-sm text-red-500"
    >
      {pending ? "حذف..." : "حذف"}
    </button>
  );
}
