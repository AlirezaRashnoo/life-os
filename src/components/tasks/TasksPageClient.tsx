"use client";

import { useMemo, useState } from "react";
import { Task } from "@prisma/client";
import { ListTodo, Clock, CheckCircle2 } from "lucide-react";

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
        const priorityWeight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
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
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
            <ListTodo className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-h1 text-foreground">کار‌ها</h1>
            <p className="mt-0.5 text-body-sm text-muted-foreground">
              کارهای خود را مدیریت کنید و متمرکز بمانید.
            </p>
          </div>
        </div>

        <NewTaskDialog />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md hover:shadow-black/5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ListTodo className="h-5 w-5" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground">تعداد کل</p>
            <p className="mt-0.5 text-h2 text-foreground">{totalTasks}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md hover:shadow-black/5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground">در انتظار</p>
            <p className="mt-0.5 text-h2 text-foreground">{pendingTasks}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md hover:shadow-black/5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground">انجام شده</p>
            <p className="mt-0.5 text-h2 text-foreground">{completedTasks}</p>
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER + SORT */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3">
        <TaskSearch value={search} onChange={setSearch} />

        <div className="flex items-center gap-2">
          <TaskFilters value={filter} onChange={setFilter} />
          <TaskSort value={sort} onChange={setSort} />
        </div>
      </div>

      {/* LIST */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title={search ? "نتیجه‌ای پیدا نشد" : "هنوز کار‌ای ثبت نشده"}
          description={
            search
              ? "کلیدواژهٔ دیگری را امتحان کنید."
              : "اولین کارٔ خود را بسازید و متمرکز بمانید."
          }
          action={<NewTaskDialog />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
