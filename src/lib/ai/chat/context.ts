import { prisma } from "@/lib/prisma";

export async function getAIChatContext(userId: string) {
  const [tasks, habits, events, notes] = await Promise.all([
    prisma.task.findMany({
      where: {
        userId,
      },

      orderBy: {
        updatedAt: "desc",
      },

      take: 10,

      select: {
        title: true,
        description: true,
        completed: true,
        priority: true,
        dueDate: true,
      },
    }),

    prisma.habit.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 10,

      select: {
        title: true,
        description: true,
      },
    }),

    prisma.event.findMany({
      where: {
        userId,
      },

      orderBy: {
        startTime: "asc",
      },

      take: 10,

      select: {
        title: true,
        description: true,
        startTime: true,
        endTime: true,
      },
    }),

    prisma.note.findMany({
      where: {
        userId,
      },

      orderBy: {
        updatedAt: "desc",
      },

      take: 5,

      select: {
        title: true,
        content: true,
      },
    }),
  ]);

  return {
    tasks,
    habits,
    events,
    notes,
  };
}
