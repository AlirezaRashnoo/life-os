"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NoteEditor from "./NoteEditor";
import { createNote } from "@/actions/notes";
import { useState } from "react";

export default function NewNoteDialog() {
  const [open, setOpen] = useState(false);

  async function handleSave(data: { title: string; content: string }) {
    await createNote(data);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new note</DialogTitle>
        </DialogHeader>

        <NoteEditor onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
}
