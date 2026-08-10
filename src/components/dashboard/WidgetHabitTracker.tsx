import Link from "next/link";
import { ArrowLeft, Infinity as InfinityIcon, Check } from "lucide-react";
import { Habit, HabitCompletion } from "@prisma/client";

import WidgetContainer from "./WidgetContainer";

type HabitWithCompletions = Habit & { completions: HabitCompletion[] };

export default function WidgetHabitTracker({
  habits,
}: {
  habits: HabitWithCompletions[];
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const isDoneToday = (habit: HabitWithCompletions) =>
    habit.completions.some((c) => c.date >= today && c.date < tomorrow);

  const completedToday = habits.filter(isDoneToday);
  const progress =
    habits.length === 0
      ? 0
      : Math.round((completedToday.length / habits.length) * 100);

  return (
    <WidgetContainer title="عادت‌ها" icon={<InfinityIcon />} accent="habit">
      <div className="flex flex-1 flex-col">
        {habits.length === 0 ? (
          <p className="flex-1 text-sm text-muted-foreground">
            هنوز عادتی ثبت نکرده‌ای.
          </p>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-4 rounded-md bg-habit/10 p-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="var(--accent-habit)"
                    strokeWidth="3"
                    strokeDasharray={`${progress} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-caption font-bold text-habit">
                  {progress}٪
                </span>
              </div>
              <div>
                <p className="text-h3 font-bold text-foreground">
                  {completedToday.length} از {habits.length}
                </p>
                <p className="text-caption text-muted-foreground">
                  عادت امروز انجام شده
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-2.5">
              {habits.slice(0, 4).map((habit) => {
                const done = isDoneToday(habit);
                return (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-foreground">
                      {habit.title}
                    </span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        done ? "bg-habit text-white" : "bg-muted"
                      }`}
                    >
                      {done && <Check size={12} strokeWidth={3} />}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <Link
          href="/habits"
          className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline"
        >
          مشاهده همه
          <ArrowLeft size={14} />
        </Link>
      </div>
    </WidgetContainer>
  );
}
