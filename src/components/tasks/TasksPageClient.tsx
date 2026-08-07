"use client";

import { useMemo, useState } from "react";
import { Task } from "@prisma/client";

import TaskCard from "./TaskCard";
import TaskSearch from "./TaskSearch";
import TaskFilters, { TaskFilter } from "./TaskFilters";
import TaskSort, { TaskSort as SortType } from "./TaskSort";

import EmptyState from "../ui/EmptyState";
import NewTaskDialog from "./NewTaskDialog";

export default function TasksPageClient({ tasks }: { tasks: Task[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("ALL");
  const [sort, setSort] = useState<SortType>("NEWEST");
  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(q) ||
          task.description?.toLowerCase().includes(q),
      );
    }

    switch (filter) {
      case "PENDING":
        result = result.filter((task) => !task.completed);
        break;
      case "COMPLETED":
        result = result.filter((task) => task.completed);
        break;
      case "HIGH":
      case "MEDIUM":
      case "LOW":
        result = result.filter((task) => task.priority === filter);
        break;
    }
    switch (sort) {
      case "NEWEST":
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "OLDEST":
        result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case "DUE_DATE":
        result.sort(
          (a, b) =>
            (a.dueDate?.getTime() ?? Infinity) -
            (b.dueDate?.getTime() ?? Infinity),
        );
        break;
      case "PRIORITY":
        const priorityWeight = {
          HIGH: 3,
          MEDIUM: 2,
          LOW: 1,
        };
        result.sort(
          (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority],
        );
        break;
    }
    return result;
  }, [tasks, search, filter, sort]);
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  return (
    <div
      className="
      space-y-6
      "
    >
      {/* HEADER */}
      <div
        className="
        flex
        items-center
        justify-between
        "
      >
        <div>
          <h1
            className="
            text-h1
            text-text-primary
            "
          >
            وظیفه ها
          </h1>

          <p
            className="
            text-body
            text-text-secondary
            mt-1
            "
          >
            کارهای خود را مدیریت کنید و متمرکز بمانید.
          </p>
        </div>

        <NewTaskDialog />
      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-3
        gap-4
        "
      >
        <div
          className="
          rounded-xl
          border
          border-border
          bg-card
          p-5
          "
        >
          <p
            className="
            text-caption
            text-text-secondary
            "
          >
            تعداد کل
          </p>
          <p
            className="
            mt-2
            text-h2
            text-text-primary
            "
          >
            {totalTasks}
          </p>
        </div>
        <div
          className="
          rounded-xl
          border
          border-border
          bg-card
          p-5
          "
        >
          <p
            className="
            text-caption
            text-text-secondary
            "
          >
            در انتظار
          </p>

          <p
            className="
            mt-2
            text-h2
            text-warning-500
            "
          >
            {pendingTasks}
          </p>
        </div>

        <div
          className="
          rounded-xl
          border
          border-border
          bg-card
          p-5
          "
        >
          <p
            className="
            text-caption
            text-text-secondary
            "
          >
            انجام شده
          </p>

          <p
            className="
            mt-2
            text-h2
            text-success-500
            "
          >
            {completedTasks}
          </p>
        </div>
      </div>
      {/* SEARCH + FILTER + SORT */}
      <div
        className="
        flex
        items-center
        justify-between
        gap-4
        flex-wrap
        "
      >
        <TaskSearch value={search} onChange={setSearch} />
        <div
          className="
flex
items-center
gap-2
"
        >
          <TaskFilters value={filter} onChange={setFilter} />

          <TaskSort value={sort} onChange={setSort} />
        </div>
      </div>
      {/* LIST */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title={search ? "No matching tasks" : "No tasks yet"}
          description={
            search
              ? "Try another keyword."
              : "Create your first task and stay focused."
          }
          action={<NewTaskDialog />}
        />
      ) : (
        <div
          className="
            grid
            grid-cols-3
            gap-3
            "
        >
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
