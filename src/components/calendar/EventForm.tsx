"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import JalaliDatePicker from "./JalaliDatePicker";
import { dateToJalali, jalaliToDate } from "@/lib/date-converter";

type Props = {
  onSave: (data: {
    title: string;
    description?: string;
    startTime: Date;
    endTime?: Date;
  }) => void;

  defaultDate?: Date;
};

export default function EventForm({ onSave, defaultDate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(defaultDate ?? new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  function submit() {
    if (!title.trim()) return;
    const jalaliDate = dateToJalali(date);
    const startTimeDate = jalaliToDate(jalaliDate, startTime);
    const endTimeDate = jalaliToDate(jalaliDate, endTime);

    onSave({
      title,

      description,

      startTime: startTimeDate,

      endTime: endTimeDate,
    });
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="عنوان رویداد"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="توضیحات"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <JalaliDatePicker value={date} onChange={setDate} />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm mb-1">شروع</p>

          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
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
      </div>

      <Button className="w-full" onClick={submit}>
        ذخیره رویداد
      </Button>
    </div>
  );
}
