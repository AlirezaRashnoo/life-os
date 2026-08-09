"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatTehranDateTime } from "@/lib/date-converter";

export default function EventDetailsDialog({
  open,
  onOpenChange,
  event,
  onEdit,
  onDelete,
}: any) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium">شروع</p>

            <p className="text-muted-foreground">
              {formatTehranDateTime(event.start)}
            </p>
          </div>

          {event.end && (
            <div>
              <p className="font-medium">پایان</p>

              <p className="text-muted-foreground">
                {formatTehranDateTime(event.end)}
              </p>
            </div>
          )}

          {event.description && (
            <div>
              <p className="font-medium">توضیحات</p>

              <p className="text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-5">
          <Button className="flex-1" onClick={onEdit}>
            ویرایش
          </Button>

          <Button variant="destructive" className="flex-1" onClick={onDelete}>
            حذف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
