"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { updateBookmark } from "@/actions/bookmarks";
import { Pencil } from "lucide-react";

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
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await updateBookmark(bookmark.id, { title, url, description });
    setSaving(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0 text-text-tertiary hover:text-text-primary"
        onClick={() => setOpen(true)}
        aria-label="Edit bookmark"
      >
        <Pencil size={14} />
      </Button>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-h3">Edit bookmark</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <label className="text-caption uppercase tracking-wide text-text-tertiary">
              عنوان
            </label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <label className="text-caption uppercase tracking-wide text-text-tertiary">
              لینک
            </label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="font-mono text-body-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-caption uppercase tracking-wide text-text-tertiary">
              توضیحات
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !url.trim() || saving}
          >
            {saving ? "ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
