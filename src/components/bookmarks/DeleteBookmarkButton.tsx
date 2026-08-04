"use client";

import { deleteBookmark } from "@/actions/bookmarks";
import { Button } from "@/components/ui/button";
import { Trash2, Check, X } from "lucide-react";
import { useState, useTransition } from "react";

export default function DeleteBookmarkButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await deleteBookmark(id);
    });
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => setConfirming(false)}
          aria-label="Cancel delete"
        >
          <X size={14} />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={handleConfirm}
          disabled={pending}
          aria-label="Confirm delete"
        >
          <Check size={14} />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 w-7 p-0 text-text-tertiary hover:text-error-500"
      onClick={() => setConfirming(true)}
      aria-label="Delete bookmark"
    >
      <Trash2 size={14} />
    </Button>
  );
}
