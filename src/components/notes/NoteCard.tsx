"use client";

import { Calendar, StickyNote } from "lucide-react";
import DeleteNoteButton from "./DeleteNoteButton";
import EditNoteDialog from "./EditNoteDialog";

export default function NoteCard({
  note,
}: {
  note: {
    id: string;
    title: string | null;
    content: string;
    createdAt: Date;
  };
}) {
  return (
    <div
      className="
        group relative
        flex flex-col gap-y-3
        rounded-2xl border border-border bg-card
        p-4
        transition-all duration-300 ease-out
        hover:shadow-xl hover:shadow-black/10
        hover:border-primary/30
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-x-3">
        <div className="flex min-w-0 items-start gap-x-2.5">
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-xl bg-gradient-to-br from-primary/20 to-primary/5
              text-primary
            "
          >
            <StickyNote className="h-4 w-4" />
          </div>

          <h3 className="line-clamp-1 pt-1.5 text-h3 text-foreground">
            {note.title || "بدون عنوان"}
          </h3>
        </div>

        <div
          className="
            flex shrink-0 items-center gap-x-1
            opacity-0 transition
            group-hover:opacity-100
          "
        >
          <EditNoteDialog note={note} />
          <DeleteNoteButton noteId={note.id} />
        </div>
      </div>

      {/* محتوا */}
      <p className="line-clamp-3 text-body-sm leading-relaxed text-muted-foreground">
        {note.content}
      </p>

      {/* تاریخ */}
      <div className="mt-auto flex items-center gap-x-1.5 pt-1">
        <span
          className="
            inline-flex items-center gap-x-1.5
            rounded-full bg-muted px-2 py-1
            text-caption text-muted-foreground
          "
        >
          <Calendar className="h-3 w-3" />
          {new Date(note.createdAt).toLocaleDateString("fa-IR")}
        </span>
      </div>
    </div>
  );
}
