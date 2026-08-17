import { prisma } from "@/lib/prisma";
import { USER_TIMEZONE } from "@/lib/date";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: USER_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: USER_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getTehranTodayBounds() {
  const now = new Date();
  const localDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: USER_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const [year, month, day] = localDate.split("-").map(Number);

  const startOfToday = new Date(Date.UTC(year, month - 1, day, -3, -30, 0, 0));
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setUTCDate(startOfTomorrow.getUTCDate() + 1);
  const startOfDayAfterTomorrow = new Date(startOfTomorrow);
  startOfDayAfterTomorrow.setUTCDate(startOfDayAfterTomorrow.getUTCDate() + 1);

  return {
    localDate,
    startOfToday,
    startOfTomorrow,
    startOfDayAfterTomorrow,
  };
}

function getTaskScore(
  priority: "LOW" | "MEDIUM" | "HIGH",
  dueDate: Date | null,
  now: Date,
  startOfToday: Date,
  startOfTomorrow: Date,
) {
  let score = 0;

  if (priority === "HIGH") {
    score += 70;
  } else if (priority === "MEDIUM") {
    score += 40;
  } else {
    score += 15;
  }

  if (dueDate) {
    if (dueDate < startOfToday) {
      score += 30;
    } else if (dueDate >= startOfToday && dueDate < startOfTomorrow) {
      score += 25;
    } else {
      score += 5;
    }

    const hoursUntilDue =
      (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilDue > 0 && hoursUntilDue <= 6) {
      score += 15;
    }
  }

  return score;
}

export type MorningBriefContext = {
  timezone: string;
  today: string;
  currentTime: string;

  tasks: {
    id: string;
    title: string;
    description: string | null;
    priority: "LOW" | "MEDIUM" | "HIGH";
    completed: boolean;
    dueDate: string | null;
    dueTime: string | null;
    dueStatus: "overdue" | "today" | "upcoming" | "none";
    score: number;
  }[];

  priorities: {
    id: string;
    title: string;
    description: string | null;
    priority: "LOW" | "MEDIUM" | "HIGH";
    completed: boolean;
    dueDate: string | null;
    dueTime: string | null;
    dueStatus: "overdue" | "today" | "upcoming" | "none";
    score: number;
    rank: number;
    recommended: boolean;
  }[];

  events: {
    id: string;
    title: string;
    description: string | null;
    startTime: string;
    endTime: string | null;
  }[];

  habits: {
    id: string;
    title: string;
    description: string | null;
    completedToday: boolean;
    completionTime: string | null;
  }[];

  rules: {
    highestPriorityTask: string | null;
    highestPriorityTaskScore: number | null;
    calendarEventCount: number;
    pendingHabitCount: number;
  };
};

export async function getMorningBriefContext(
  userId: string,
): Promise<MorningBriefContext> {
  const now = new Date();
  const { localDate, startOfToday, startOfTomorrow, startOfDayAfterTomorrow } =
    getTehranTodayBounds();
  const [tasks, events, habits] = await Promise.all([
    prisma.task.findMany({
      where: {
        userId,
        completed: false,
      },
      orderBy: {
        dueDate: "asc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        dueDate: true,
        completed: true,
      },
    }),
    prisma.event.findMany({
      where: {
        userId,
        startTime: {
          gte: startOfToday,
          lt: startOfDayAfterTomorrow,
        },
      },
      orderBy: {
        startTime: "asc",
      },
      select: {
        id: true,
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
      select: {
        id: true,
        title: true,
        description: true,
        completions: {
          where: {
            date: {
              gte: startOfToday,
              lt: startOfTomorrow,
            },
          },

          select: {
            id: true,
            date: true,
          },
        },
      },
    }),
  ]);

  const rankedTasks = tasks
    .map((task) => {
      const score = getTaskScore(
        task.priority,
        task.dueDate,
        now,
        startOfToday,
        startOfTomorrow,
      );

      let dueStatus: "overdue" | "today" | "upcoming" | "none" = "none";

      if (task.dueDate) {
        if (task.dueDate < startOfToday) {
          dueStatus = "overdue";
        } else if (task.dueDate < startOfTomorrow) {
          dueStatus = "today";
        } else {
          dueStatus = "upcoming";
        }
      }

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: task.completed,
        dueDate: task.dueDate ? formatDate(task.dueDate) : null,
        dueTime: task.dueDate ? formatTime(task.dueDate) : null,
        dueStatus,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  const priorities = rankedTasks.slice(0, 3).map((task, index) => ({
    ...task,
    rank: index + 1,
    recommended: index === 0,
  }));

  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    startTime: formatTime(event.startTime),
    endTime: event.endTime ? formatTime(event.endTime) : null,
  }));

  const formattedHabits = habits.map((habit) => ({
    id: habit.id,
    title: habit.title,
    description: habit.description,
    completedToday: habit.completions.length > 0,
    completionTime:
      habit.completions.length > 0
        ? formatTime(habit.completions[0].date)
        : null,
  }));

  return {
    timezone: USER_TIMEZONE,
    today: localDate,
    currentTime: formatTime(now),
    tasks: rankedTasks,
    priorities,
    events: formattedEvents,
    habits: formattedHabits,
    rules: {
      highestPriorityTask: priorities[0]?.title ?? null,
      highestPriorityTaskScore: priorities[0]?.score ?? null,
      calendarEventCount: formattedEvents.length,
      pendingHabitCount: formattedHabits.filter(
        (habit) => !habit.completedToday,
      ).length,
    },
  };
}
