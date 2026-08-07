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

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  const styles = {
    HIGH: "text-error-500 border-error-500/30 bg-error-bg",

    MEDIUM: "text-warning-500 border-warning-500/30 bg-warning-bg",

    LOW: "text-text-tertiary border-border bg-surface-2",
  };

  return (
    <span
      className={`
      flex
      items-center
      gap-1

      px-2
      py-1

      rounded-full

      border

      text-caption

      ${styles[priority]}
      `}
    >
      <Flag size={11} />

      {priority}
    </span>
  );
}

export default function TaskCard({ task }: { task: Task }) {
  const overdue = task.dueDate && !task.completed && task.dueDate < new Date();

  return (
    <div
      className="
      group

      flex
      items-start
      justify-between

      gap-4

      border
      border-border

      rounded-xl

      bg-surface-1

      p-4

      transition

      hover:border-border-strong
      "
    >
      {/* CONTENT */}

      <div className="flex gap-3 min-w-0">
        <ToggleTaskButton id={task.id} completed={task.completed} />

        <div className="min-w-0">
          <div
            className="
            flex
            items-center
            gap-2
            "
          >
            <h3
              className={`
              text-h3
              truncate

              ${
                task.completed
                  ? "line-through text-text-tertiary"
                  : "text-text-primary"
              }
              `}
            >
              {task.title}
            </h3>

            <PriorityBadge priority={task.priority} />
          </div>

          {task.description && (
            <p
              className="
              mt-2

              text-body-sm

              text-text-secondary

              line-clamp-2
              "
            >
              {task.description}
            </p>
          )}

          <div
            className="
            mt-3

            flex
            items-center
            flex-wrap

            gap-3
            "
          >
            {task.dueDate && (
              <span
                className={`
                flex
                items-center
                gap-1.5

                text-caption

                ${overdue ? "text-error-500" : "text-text-tertiary"}
                `}
              >
                <CalendarDays size={13} />

                {formatTaskDate(task.dueDate)}
              </span>
            )}

            <span
              className="
              flex
              items-center
              gap-1.5

              text-caption

              text-text-tertiary
              "
            >
              <Clock3 size={12} />

              {task.createdAt.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>

            {task.completed ? (
              <span
                className="
                text-caption
                text-success-500
                "
              >
                انجام شده
              </span>
            ) : (
              <span
                className="
                text-caption
                text-warning-500
                "
              >
                در انتظار
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ACTIONS */}

      <div
        className="
        flex
        gap-1

        opacity-0

        group-hover:opacity-100

        transition
        "
      >
        <EditTaskDialog task={task} />

        <DeleteTaskButton id={task.id} />
      </div>
    </div>
  );
}
