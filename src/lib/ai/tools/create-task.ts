import { prisma } from "@/lib/prisma";

export async function createTaskForAI(
  userId: string,
  data: {
    title: string;
    description?: string;
    priority?: "LOW" | "MEDIUM" | "HIGH";
    dueDate?: Date;
  },
) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority ?? "MEDIUM",
      dueDate: data.dueDate,
      userId,
    },
  });
}
