import Link from "next/link";
import { ArrowLeft, ListChecks } from "lucide-react";
import { Task } from "@prisma/client";

import WidgetContainer from "./WidgetContainer";

function StatCard({
  label,
  value,
  colorClass = "text-foreground",
}: {
  label: string;
  value: number;
  colorClass?: string;
}) {
  return (
    <div className="rounded-md bg-muted/60 p-3">
      <p className="text-caption text-muted-foreground">{label}</p>
      <p className={`mt-1 text-h1 font-bold ${colorClass}`}>{value}</p>
    </div>
  );
}

export default function WidgetTodo({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dueToday = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return task.dueDate >= today && task.dueDate < tomorrow;
  }).length;

  return (
    <WidgetContainer title="کارها" icon={<ListChecks />} accent="primary">
      <div className="flex flex-1 flex-col">
        {total === 0 ? (
          <p className="flex-1 text-sm text-muted-foreground">
            هنوز کاری اضافه نکرده‌ای.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1.5 text-caption text-muted-foreground">
                {progress}٪ تکمیل شده
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="کل" value={total} />
              <StatCard
                label="انجام‌شده"
                value={completed}
                colorClass="text-habit"
              />
              <StatCard
                label="باقی‌مانده"
                value={remaining}
                colorClass="text-warning"
              />
              <StatCard
                label="امروز"
                value={dueToday}
                colorClass="text-destructive"
              />
            </div>
          </>
        )}

        <Link
          href="/tasks"
          className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline"
        >
          مشاهده همه
          <ArrowLeft size={14} />
        </Link>
      </div>
    </WidgetContainer>
  );
}
