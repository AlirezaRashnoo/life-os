import { Calendar } from "lucide-react";
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
        group
        flex flex-col
        gap-y-3
        border border-border
        rounded-lg
        p-4
        bg-card
        hover:border-border-strong
        hover:shadow-sm
        transition-all
      "
    >
      <div className="flex items-start justify-between gap-x-4">
        <h3 className="text-h3 line-clamp-1">{note.title || "بدون عنوان"}</h3>

        <div
          className="
            flex items-center gap-x-1
            shrink-0
          "
        >
          <EditNoteDialog note={note} />
          <DeleteNoteButton noteId={note.id} />
        </div>
      </div>

      <p className="text-body-sm text-text-tertiary line-clamp-3">
        {note.content}
      </p>

      <span className="flex items-center gap-x-1.5 text-caption text-text-tertiary">
        <Calendar className="size-3.5" />
        {note.createdAt.toLocaleDateString()}
      </span>
    </div>
  );
}
