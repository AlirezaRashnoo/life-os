"use client";

import { deleteBookmark } from "@/actions/bookmarks";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export default function DeleteBookmarkButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteBookmark(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="
      text-text-tertiary
      hover:text-error-500
      transition
      "
    >
      <Trash2 size={16} className="text-red-400 cursor-pointer" />
    </button>
  );
}
