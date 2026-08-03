"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { updateBookmark } from "@/actions/bookmarks";
import { Edit } from "lucide-react";

export default function EditBookmarkDialog({
  bookmark,
}: {
  bookmark: {
    id: string;
    title: string;
    url: string;
    description: string | null;
  };
}) {
  const [title, setTitle] = useState(bookmark.title);
  const [url, setUrl] = useState(bookmark.url);
  const [description, setDescription] = useState(bookmark.description ?? "");
  const [open, setOpen] = useState(false);

  async function handleSave() {
    await updateBookmark(bookmark.id, {
      title,
      url,
      description,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <Edit size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Bookmark</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          <Input value={url} onChange={(e) => setUrl(e.target.value)} />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={handleSave} className="w-full">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
