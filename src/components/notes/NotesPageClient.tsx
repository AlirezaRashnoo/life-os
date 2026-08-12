"use client";

import { useMemo, useState } from "react";
import type { Note } from "@prisma/client";
import { Input } from "@/components/ui/input";
import EmptyState from "@/components/ui/EmptyState";
import NewNoteDialog from "./NewNoteDialog";
import NoteCard from "./NoteCard";

export default function NotesPageClient({ notes }: { notes: Note[] }) {
  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return notes;

    return notes.filter((note) => {
      return (
        note.title?.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    });
  }, [notes, search]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-text-primary">یادداشت ها</h1>

          <p className="mt-1 text-body text-text-secondary">
            ایده‌ها را ثبت کنید و افکارتان را منظم نگه دارید.
          </p>
        </div>

        <NewNoteDialog />
      </div>

      <Input
        placeholder="جستجو یادداشت..."
        className="max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <section className="space-y-4">
        <h2 className="text-h2">همه یادداشت ها</h2>

        {filteredNotes.length === 0 ? (
          <EmptyState
            title={search ? "No matching notes" : "No notes yet"}
            description={search ? "Try another search." : "ایجاد اولین یادداشت"}
            action={!search ? <NewNoteDialog /> : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
