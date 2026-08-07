"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TaskSort = "NEWEST" | "OLDEST" | "DUE_DATE" | "PRIORITY";

interface TaskSortProps {
  value: TaskSort;
  onChange: (value: TaskSort) => void;
}

export default function TaskSort({ value, onChange }: TaskSortProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as TaskSort)}
    >
      <SelectTrigger
        className="
          h-9
          w-[160px]
          rounded-lg
          border-border
          bg-card
          text-sm
          text-foreground
          shadow-none
          hover:bg-accent/50
        "
      >
        <SelectValue placeholder="مرتب‌سازی" />
      </SelectTrigger>

      <SelectContent
        align="end"
        className="
          rounded-xl
        "
      >
        <SelectItem value="NEWEST">جدیدترین</SelectItem>

        <SelectItem value="OLDEST">قدیمی‌ترین</SelectItem>

        <SelectItem value="DUE_DATE">تاریخ سررسید</SelectItem>

        <SelectItem value="PRIORITY">اولویت</SelectItem>
      </SelectContent>
    </Select>
  );
}
