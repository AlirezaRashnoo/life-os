"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBookmark } from "@/actions/bookmarks";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { useState } from "react";

export default function NewBookmarkDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setSaving(true);
    await createBookmark({ title, url, description });

    setTitle("");
    setUrl("");
    setDescription("");
    setSaving(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className="gap-1.5" onClick={() => setOpen(true)}>
        <Plus size={16} />
        اضافه کردن نشانک
      </Button>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-h3">Add bookmark</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <label className="text-caption uppercase tracking-wide text-text-tertiary">
              عنوان
            </label>
            <Input
              placeholder="Next.js docs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-caption uppercase tracking-wide text-text-tertiary">
              لینک
            </label>
            <Input
              placeholder="nextjs.org/docs"
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
              placeholder="What is this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            لغو
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !url.trim() || saving}
          >
            {saving ? "Saving..." : "Save bookmark"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
