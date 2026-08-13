"use client";

import { TaskPriority } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TaskFilter = "ALL" | "PENDING" | "COMPLETED" | TaskPriority;

interface TaskFiltersProps {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
}

export default function TaskFilters({ value, onChange }: TaskFiltersProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as TaskFilter)}
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
        <SelectValue placeholder="فیلتر کار ها" />
      </SelectTrigger>

      <SelectContent
        align="end"
        className="
          rounded-xl
        "
      >
        <SelectItem value="ALL">همه کار ها</SelectItem>

        <SelectItem value="PENDING">در انتظار</SelectItem>

        <SelectItem value="COMPLETED">انجام شده</SelectItem>

        <SelectItem value="HIGH">اولویت بالا</SelectItem>

        <SelectItem value="MEDIUM">اولویت متوسط</SelectItem>

        <SelectItem value="LOW">اولویت پایین</SelectItem>
      </SelectContent>
    </Select>
  );
}
