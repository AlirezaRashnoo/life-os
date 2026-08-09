"use client";
import { useState } from "react";
import { addMonths, subMonths, format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale/fa-IR";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getMonthDays } from "@/lib/jalali-calendar";
import { sameJalaliDay } from "@/lib/date-converter";

type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  description?: string;
};

export default function JalaliCalendar({
  events,
  onDateClick,
  onEventClick,
}: {
  events: CalendarEvent[];
  onDateClick?: (d: Date) => void;
  onEventClick?: (e: CalendarEvent) => void;
}) {
  const [month, setMonth] = useState(new Date());
  const days = getMonthDays(month);

  return (
    <div>
      <div
        className="
        flex
        justify-between
        items-center
        p-4
        border-b
        "
      >
        <button onClick={() => setMonth(subMonths(month, 1))}>
          <ChevronRight />
        </button>

        <h2 className="font-bold">
          {format(month, "MMMM yyyy", {
            locale: faIR,
          })}
        </h2>
        <button onClick={() => setMonth(addMonths(month, 1))}>
          <ChevronLeft />
        </button>
      </div>
      <div
        className="
        grid
        grid-cols-7
        "
      >
        {days.map((day) => {
          const dayEvents = events.filter((event) =>
            sameJalaliDay(event.start, day),
          );

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDateClick?.(day)}
              className="
              min-h-32
              border
              p-2
              cursor-pointer
              "
            >
              <div>
                {format(day, "d", {
                  locale: faIR,
                })}
              </div>
              <div className="space-y-1 mt-2">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event);
                    }}
                    className="
                    block
                    w-full
                    rounded
                    bg-primary
                    text-white
                    text-xs
                    p-1
                    truncate
                    "
                  >
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
