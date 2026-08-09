"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import JalaliDatePicker from "./JalaliDatePicker";
import { dateToTime, dateToJalali, jalaliToDate } from "@/lib/date-converter";
import { updateEvent } from "@/actions/calendar";
import { useRouter } from "next/navigation";

type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  event?: CalendarEvent;
};

export default function EditEventDialog({ open, onOpenChange, event }: Props) {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!event) return;
    setTitle(event.title);
    setDescription(event.description ?? "");
    setDate(new Date(event.start));
    setTime(dateToTime(event.start));
    setEndTime(event.end ? dateToTime(event.end) : "");
  }, [event]);

  async function save() {
    if (!event || !date) return;
    const jalali = dateToJalali(date);
    const startTime = jalaliToDate(jalali, time);
    const end = endTime ? jalaliToDate(jalali, endTime) : undefined;
    await updateEvent(event.id, {
      title,
      description,
      startTime,
      endTime: end,
    });
    router.refresh();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش رویداد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <JalaliDatePicker value={date} onChange={setDate} />
          <div>
            <p className="text-sm mb-1">شروع</p>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <p className="text-sm mb-1">پایان</p>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={save}>
            ذخیره تغییرات
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
