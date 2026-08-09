"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import EventForm from "./EventForm";
import { createEvent } from "@/actions/calendar";

export default function NewEventDialog({
  open,
  onOpenChange,
  defaultDate,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultDate?: Date;
}) {
  const router = useRouter();
  async function handleCreate(data: any) {
    await createEvent(data);
    router.refresh();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ایجاد رویداد</DialogTitle>
        </DialogHeader>
        <EventForm defaultDate={defaultDate} onSave={handleCreate} />
      </DialogContent>
    </Dialog>
  );
}
