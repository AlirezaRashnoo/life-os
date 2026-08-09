"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, subMonths, format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale/fa-IR";
import { getMonthDays } from "@/lib/jalali-calendar";

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
};

export default function JalaliDatePicker({ value, onChange }: Props) {
  const [month, setMonth] = useState(value ?? new Date());
  const days = getMonthDays(month);

  return (
    <div
      className="
      rounded-xl
      border
      bg-card
      p-4
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        mb-4
        "
      >
        <button onClick={() => setMonth(subMonths(month, 1))}>
          <ChevronRight size={18} />
        </button>
        <div
          className="
          font-medium
          "
        >
          {format(month, "MMMM yyyy", {
            locale: faIR,
          })}
        </div>

        <button onClick={() => setMonth(addMonths(month, 1))}>
          <ChevronLeft size={18} />
        </button>
      </div>

      <div
        className="
        grid
        grid-cols-7
        gap-1
        text-center
        "
      >
        {days.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => onChange(day)}
            className={`
            h-9
            rounded-md
            text-sm
            ${
              value?.toDateString() === day.toDateString()
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }

          `}
          >
            {format(day, "d", {
              locale: faIR,
            })}
          </button>
        ))}
      </div>
    </div>
  );
}
