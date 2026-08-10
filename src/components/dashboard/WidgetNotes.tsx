import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import WidgetContainer from "./WidgetContainer";

type Note = {
  id: string;
  title: string | null;
  content: string;
  updatedAt: Date;
};

function formatRelativeDate(date: Date) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  if (minutes < 1) return "همین الان";
  if (minutes < 60) return `${minutes} دقیقه پیش`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ساعت پیش`;
  return `${Math.floor(hours / 24)} روز پیش`;
}

export default function WidgetNotes({ notes }: { notes: Note[] }) {
  return (
    <WidgetContainer title="یادداشت‌ها" icon={<FileText />} accent="muted">
      <div className="flex flex-1 flex-col">
        {notes.length === 0 ? (
          <p className="flex-1 text-sm text-muted-foreground">
            هنوز یادداشتی اضافه نکرده‌ای.
          </p>
        ) : (
          <div className="flex-1 space-y-1">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-md p-2 transition-colors hover:bg-accent"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="truncate text-sm font-medium text-foreground">
                    {note.title ?? "بدون عنوان"}
                  </h3>
                  <span className="shrink-0 text-caption text-muted-foreground">
                    {formatRelativeDate(note.updatedAt)}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-caption text-muted-foreground">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/notes"
          className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline"
        >
          مشاهده همه
          <ArrowLeft size={14} />
        </Link>
      </div>
    </WidgetContainer>
  );
}
