import { prisma } from "@/lib/prisma";
import { USER_TIMEZONE } from "@/lib/date";

function getLocalDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: USER_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [year, month, day] = formatter.format(date).split("-").map(Number);

  return { year, month, day };
}

function getWeekRange() {
  const now = new Date();

  const { year, month, day } = getLocalDateParts(now);

  // LifeOS week starts on Saturday.
  const localToday = new Date(Date.UTC(year, month - 1, day));

  const dayOfWeek = localToday.getUTCDay();
  const daysSinceSaturday = (dayOfWeek + 1) % 7;

  const startLocal = new Date(localToday);
  startLocal.setUTCDate(startLocal.getUTCDate() - daysSinceSaturday);

  const endLocal = new Date(startLocal);
  endLocal.setUTCDate(endLocal.getUTCDate() + 7);

  return {
    start: startLocal,
    end: endLocal,
  };
}

export type WeeklyReviewContext = {
  week: {
    start: string;
    end: string;
  };

  statistics: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    completionRate: number;

    highPriorityPending: number;
    mediumPriorityPending: number;
    lowPriorityPending: number;

    events: number;
    habits: number;
    habitCompletions: number;
    notesUpdated: number;
  };

  tasks: {
    title: string;
    description: string | null;
    completed: boolean;
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
  }[];

  events: {
    title: string;
    description: string | null;
    startTime: string;
    endTime: string | null;
  }[];

  habits: {
    title: string;
    description: string | null;
    completionsThisWeek: number;
  }[];

  notes: {
    title: string | null;
    content: string;
    updatedAt: string;
  }[];
};

export async function getWeeklyReviewContext(
  userId: string,
): Promise<WeeklyReviewContext> {
  const { start, end } = getWeekRange();

  const [tasks, events, habits, habitCompletions, notes] = await Promise.all([
    prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        title: true,
        description: true,
        completed: true,
        priority: true,
        dueDate: true,
        createdAt: true,
        updatedAt: true,
      },
    }),

    prisma.event.findMany({
      where: {
        userId,
        startTime: {
          gte: start,
          lt: end,
        },
      },
      orderBy: {
        startTime: "asc",
      },
      select: {
        title: true,
        description: true,
        startTime: true,
        endTime: true,
      },
    }),

    prisma.habit.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    }),

    prisma.habitCompletion.findMany({
      where: {
        habit: {
          userId,
        },
        date: {
          gte: start,
          lt: end,
        },
      },
      select: {
        habitId: true,
      },
    }),

    prisma.note.findMany({
      where: {
        userId,
        updatedAt: {
          gte: start,
          lt: end,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        title: true,
        content: true,
        updatedAt: true,
      },
    }),
  ]);

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  const highPriorityPending = pendingTasks.filter(
    (task) => task.priority === "HIGH",
  );

  const mediumPriorityPending = pendingTasks.filter(
    (task) => task.priority === "MEDIUM",
  );

  const lowPriorityPending = pendingTasks.filter(
    (task) => task.priority === "LOW",
  );

  const completionRate =
    tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

  const completionCountByHabit = new Map<string, number>();

  for (const completion of habitCompletions) {
    completionCountByHabit.set(
      completion.habitId,
      (completionCountByHabit.get(completion.habitId) ?? 0) + 1,
    );
  }

  return {
    week: {
      start: start.toISOString(),
      end: end.toISOString(),
    },

    statistics: {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      pendingTasks: pendingTasks.length,
      completionRate,

      highPriorityPending: highPriorityPending.length,
      mediumPriorityPending: mediumPriorityPending.length,
      lowPriorityPending: lowPriorityPending.length,

      events: events.length,
      habits: habits.length,
      habitCompletions: habitCompletions.length,
      notesUpdated: notes.length,
    },

    tasks: tasks.map((task) => ({
      title: task.title,
      description: task.description,
      completed: task.completed,
      priority: task.priority,
      dueDate: task.dueDate?.toISOString() ?? null,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    })),

    events: events.map((event) => ({
      title: event.title,
      description: event.description,
      startTime: event.startTime.toISOString(),
      endTime: event.endTime?.toISOString() ?? null,
    })),

    habits: habits.map((habit) => ({
      title: habit.title,
      description: habit.description,
      completionsThisWeek: completionCountByHabit.get(habit.id) ?? 0,
    })),

    notes: notes.map((note) => ({
      title: note.title,
      content: note.content.slice(0, 500),
      updatedAt: note.updatedAt.toISOString(),
    })),
  };
}
