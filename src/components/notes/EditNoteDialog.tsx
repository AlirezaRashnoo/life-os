"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import NoteEditor from "./NoteEditor";
import { updateNote } from "@/actions/notes";
import { useState } from "react";

export default function EditNoteDialog({
  note,
}: {
  note: {
    id: string;
    title: string | null;
    content: string;
  };
}) {
  const [open, setOpen] = useState(false);

  async function handleUpdate(data: { title: string; content: string }) {
    await updateNote(note.id, data);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
        </DialogHeader>

        <NoteEditor
          initialTitle={note.title ?? ""}
          initialContent={note.content}
          onSave={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
