import { Task } from "@prisma/client";
import ToggleTaskButton from "./ToggleTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskDialog from "./EditTaskDialog";

import { CalendarDays, Clock3, Flag } from "lucide-react";

function formatTaskDate(date: Date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const taskDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diff = (taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff === 0) return "امروز";
  if (diff === 1) return "فردا";
  if (diff === -1) return "دیروز";

  return date.toLocaleDateString("fa-IR", {
    month: "short",
    day: "numeric",
  });
}

const priorityConfig = {
  HIGH: {
    label: "بالا",
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10 border-destructive/20",
  },
  MEDIUM: {
    label: "متوسط",
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning/10 border-warning/20",
  },
  LOW: {
    label: "پایین",
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
    bg: "bg-muted border-border",
  },
};

function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  const cfg = priorityConfig[priority];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full border px-2 py-1
        text-caption font-medium
        ${cfg.bg} ${cfg.text}
      `}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function TaskCard({ task }: { task: Task }) {
  const overdue = task.dueDate && !task.completed && task.dueDate < new Date();

  return (
    <div
      className={`
        group relative flex items-start justify-between gap-4
        rounded-2xl border p-4
        transition-all duration-300
        hover:shadow-lg hover:shadow-black/5
        ${
          overdue
            ? "border-destructive/25 bg-destructive/[0.03]"
            : "border-border bg-card hover:border-primary/30"
        }
      `}
    >
      {/* CONTENT */}
      <div className="flex min-w-0 gap-3">
        <div className="pt-0.5">
          <ToggleTaskButton id={task.id} completed={task.completed} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`
                truncate text-h3
                ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}
              `}
            >
              {task.title}
            </h3>

            <PriorityBadge priority={task.priority} />
          </div>

          {task.description && (
            <p className="mt-2 line-clamp-2 text-body-sm text-muted-foreground">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {task.dueDate && (
              <span
                className={`
                  flex items-center gap-1.5 text-caption
                  ${overdue ? "font-medium text-destructive" : "text-muted-foreground"}
                `}
              >
                <CalendarDays size={13} />
                {formatTaskDate(task.dueDate)}
              </span>
            )}

            <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <Clock3 size={12} />
              {task.createdAt.toLocaleDateString("fa-IR", {
                month: "short",
                day: "numeric",
              })}
            </span>

            <span
              className={`
                rounded-full px-2 py-0.5 text-caption font-medium
                ${
                  task.completed
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }
              `}
            >
              {task.completed ? "انجام شده" : "در انتظار"}
            </span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex shrink-0 gap-1 opacity-0 transition group-hover:opacity-100">
        <EditTaskDialog task={task} />
        <DeleteTaskButton id={task.id} />
      </div>
    </div>
  );
}
